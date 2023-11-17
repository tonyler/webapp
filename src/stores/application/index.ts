import type { State } from "@/stores/application/state";

import { defineStore } from "pinia";
import { ApplicationActionTypes } from "@/stores/application/action-types";
import { AssetUtils, EnvNetworkUtils, ThemeManager, WalletManager, WalletUtils } from "@/utils";
import { ChainConstants, NolusClient } from "@nolus/nolusjs";
import { DEFAULT_PRIMARY_NETWORK, ETL_API, INTEREST_DECIMALS, NATIVE_NETWORK, NETWORKS, WASM_LP_DEPOSIT } from "@/config/env";
import { useWalletStore, WalletActionTypes } from "@/stores/wallet";
import { useOracleStore, OracleActionTypes } from "../oracle";
import { Disparcher, Lpp } from "@nolus/nolusjs/build/contracts";
import { CONTRACTS } from "@/config/contracts";
import { Buffer } from "buffer";
import { Dec } from "@keplr-wallet/unit";
import { ApptUtils } from "@/utils/AppUtils";
import { WalletConnectMechanism } from "@/types";

const useApplicationStore = defineStore("application", {
  state: () => {
    return {
      networks: null,
      networksData: null,
      assetIcons: null,
      network: {},
      theme: null,
      apr: null,
      dispatcherRewards: null,
      lpn: null,
      native: null,
      lease: [] as string[],
      currenciesData: null,
      sessionExpired: false,
    } as State;
  },
  actions: {
    async [ApplicationActionTypes.LOAD_CURRENCIES]() {
      const network = NETWORKS[EnvNetworkUtils.getStoredNetworkName()];
      const currenciesData = await network.currencies();
      const data = AssetUtils.parseNetworks(currenciesData);
      this.assetIcons = data.assetIcons;
      this.networks = data.networks;
      this.networksData = currenciesData;

      const native = AssetUtils.getNative(currenciesData).key
      const lpn = AssetUtils.getLpn(currenciesData)!.key;
      this.native = data.networks[NATIVE_NETWORK.key][native];
      this.lpn = data.networks[NATIVE_NETWORK.key][lpn];
      this.currenciesData = data.networks[NATIVE_NETWORK.key];
      this.lease = AssetUtils.getLease(currenciesData);
    },
    async [ApplicationActionTypes.CHANGE_NETWORK](loadBalance = false) {
      try {
        const rpc = (await ApptUtils.fetchEndpoints(ChainConstants.CHAIN_KEY)).rpc;
        NolusClient.setInstance(rpc);
        const walletStore = useWalletStore();
        const oracle = useOracleStore();

        this.network.networkName = EnvNetworkUtils.getStoredNetworkName() || DEFAULT_PRIMARY_NETWORK;
        this.network.networkAddresses = {
          ...NETWORKS[this.network.networkName]
        };


        switch (WalletManager.getWalletConnectMechanism()) {
          case WalletConnectMechanism.EXTENSION: {
            walletStore[WalletActionTypes.CONNECT_KEPLR]();
            break;
          }
          case WalletConnectMechanism.LEAP: {
            walletStore[WalletActionTypes.CONNECT_LEAP]();
            break;
          }
          case WalletConnectMechanism.LEDGER: {
            walletStore[WalletActionTypes.CONNECT_LEDGER]();
            break;
          }
          case WalletConnectMechanism.LEDGER_BLUETOOTH: {
            walletStore[WalletActionTypes.CONNECT_LEDGER]();
            break;
          }
          default: {
            break;
          }
        }


        if (loadBalance) {
          await Promise.allSettled([
            walletStore[WalletActionTypes.UPDATE_BALANCES](),
            oracle[OracleActionTypes.GET_PRICES](),
          ]);
        }
      } catch (error: Error | any) {
        throw new Error(error);
      }
    },
    [ApplicationActionTypes.SET_THEME](theme: string) {
      try {
        ThemeManager.saveThemeData(theme);
        this.theme = theme;
      } catch (error: Error | any) {
        throw new Error(error);
      }
    },
    [ApplicationActionTypes.LOAD_THEME]() {
      try {
        const theme = ThemeManager.getThemeData();
        this.theme = theme;
      } catch (error: Error | any) {
        throw new Error(error);
      }
    },
    async [ApplicationActionTypes.LOAD_APR_REWARDS]() {

      try {

        const data = await fetch(`${ETL_API}/earn-apr`);
        const json = await data.json();
        this.apr = Number(json.earn_apr);


      } catch (error) {
        this.apr = 0;
        console.log(error)
      }

    },
  },
  getters: {},
});

export { useApplicationStore, ApplicationActionTypes };
