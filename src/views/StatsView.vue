<template>
  <div class="col-span-12 mb-sm-nolus-70">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between px-2 lg:pt-[25px] lg:px-0">
      <div class="left w-full md:w-1/2">
        <h1 class="text-20 nls-font-700 text-primary m-0 nls-sm-title">
          {{ $t("message.stats") }}
        </h1>
      </div>
    </div>

    <div class="background mt-6 shadow-box radius-medium radius-0-sm pt-6 pb-3 outline">
      <div class="balance-box flex px-6 items-center justify-start">

        <div class="left inline-block line-mobile pb-4 md:pb-0">
          <p class="nls-font-500 text-16 text-primary">
            {{ $t('message.total-value-locked') }}
          </p>
          <CurrencyComponent
            :fontSize="40"
            :type="CURRENCY_VIEW_TYPES.CURRENCY"
            :amount="totalValueLocked"
            denom="$"
            :has-space="false"
            :decimals="2"
            class="nls-font-700 text-primary"
          />
        </div>

        <div class="flex">
          <div class="pt-3 lg:pl-6 md:flex-none flex-1">
            <p class="nls-font-500 text-12 text-dark-grey flex items-center">
              {{ $t('message.buyback') }}
            </p>

            <CurrencyComponent
              :fontSize="20"
              :fontSizeSmall="16"
              :type="CURRENCY_VIEW_TYPES.CURRENCY"
              :amount="buybackTotal"
              :isDenomInfront="false"
              denom="NLS"
              class="nls-font-500 text-primary"
            />
          </div>
          <div class="pt-3 lg:pl-6 lg:ml-0 md:flex-none flex-1">
            <p class="nls-font-500 text-12 text-dark-grey flex items-center">
              <!-- {{ $t('message.borrow-apr') }} -->
              {{ $t('message.incentives-pool') }}
            </p>
            <CurrencyComponent
              :fontSize="20"
              :fontSizeSmall="16"
              :type="CURRENCY_VIEW_TYPES.CURRENCY"
              :amount="incentivesPool"
              denom="NLS"
              :isDenomInfront="false"
              class="nls-font-500 text-primary"
            />

          </div>
        </div>

      </div>

      <div class="border-standart lg:border-t lg:border-b-0 lg:px-6 px-3 my-2 lg:pt-4 pt-2 flex">
        <div class="pt-3 md:flex-none flex-1">
          <p class="nls-font-500 text-12 text-dark-grey flex">
            {{ $t('message.supplied') }}
          </p>

          <span class="w-[6px] h-[6px] inline-flex rounded-full mb-[4px] mr-[4px] bg-[#2868E1]">

          </span>
          <CurrencyComponent
            :fontSize="20"
            :fontSizeSmall="16"
            :type="CURRENCY_VIEW_TYPES.CURRENCY"
            :amount="suppliedBorrowed.supplied"
            denom="$"
            :has-space="false"
            class="nls-font-500 text-primary"
          />
        </div>
        <div class="pt-3 lg:pl-6 lg:ml-0 md:flex-none flex-1">
          <p class="nls-font-500 text-12 text-dark-grey flex">
            {{ $t('message.borrowed') }}
          </p>
          <span class="w-[6px] h-[6px] inline-flex rounded-full mb-[4px] mr-[4px] bg-[#FF562E]">

          </span>
          <CurrencyComponent
            :fontSize="20"
            :fontSizeSmall="16"
            :type="CURRENCY_VIEW_TYPES.CURRENCY"
            :amount="suppliedBorrowed.borrowed"
            denom="$"
            :has-space="false"
            class="nls-font-500 text-primary"
          />
        </div>
      </div>

      <div class="flex relaltive p-6 lg:block hidden">
        <StatLineChart
          ref="chartElement"
          :chart-data="chartData"
          @in-focus="inStatLineFocus"
        />
      </div>

    </div>

    <div class="flex background outline border-standart shadow-box radius-medium radius-0-sm mt-6 md:max-w-[50%] max-w-[100%]">
      <!-- <div class="md:col-span-6 lg:co-span-6"> -->
      <!-- Rewards -->
      <div class="block flex-1 p-[12px]">
        <div class="flex items-center justify-between px-0 md:px-4 pt-2 pb-0">
          <h2 class="text-16 nls-font-500 text-left my-0 text-primary">
            {{ $t('message.utilization-level') }}
          </h2>
        </div>
        <!-- Assets Container -->
        <div class="block border-b border-standart">
          <div class="grid gap-6px-3 md:px-4 py-2 items-center justify-between earn-asset grid-cols-3 md:grid-cols-3">
            <!-- Ticker -->
            <div class="inline-flex items-center col-span-2 lg:ml-0 ml-2">
              <div class="inline-block">

                <div class="pt-3">
                  <p class="nls-font-500 text-12 text-dark-grey flex">
                    {{ $t('message.osmosis') }}
                  </p>

                  <CurrencyComponent
                    :fontSize="28"
                    :fontSizeSmall="22"
                    :type="CURRENCY_VIEW_TYPES.CURRENCY"
                    :amount="utilizationLevel"
                    denom="%"
                    :isDenomInfront="false"
                    :has-space="false"
                    class="nls-font-500 text-primary"
                  />
                </div>

              </div>
            </div>

          </div>
          <!-- Assets Container -->
        </div>

        <div class="flex items-center justify-start py-4 px- md:px-6 lg:px-0">

          <div class="pt-3 pl-2 md:pl-4">
            <p class="nls-font-500 text-12 text-dark-grey flex">
              {{ $t('message.yield') }}
              <TooltipComponent :content="$t('message.yield-tooltip')" />
            </p>

            <div class="flex items-end">
              <img
                src="@/assets/icons/osmosis-usdc.svg"
                class="mr-[6px]"
              />
              <CurrencyComponent
                :fontSize="20"
                :fontSizeSmall="16"
                :type="CURRENCY_VIEW_TYPES.CURRENCY"
                :amount="(app.apr ?? 0).toString()"
                denom="%"
                :isDenomInfront="false"
                :has-space="false"
                class="nls-font-500 text-primary"
              />
            </div>

          </div>

          <div class="pt-3 pl-6">
            <p class="nls-font-500 text-12 text-dark-grey flex">
              {{ $t('message.optimal') }}
              <TooltipComponent :content="$t('message.optimal-tooltip')" />
            </p>

            <CurrencyComponent
              :fontSize="20"
              :fontSizeSmall="16"
              :type="CURRENCY_VIEW_TYPES.CURRENCY"
              :amount="optimal"
              denom="%"
              :isDenomInfront="false"
              :has-space="false"
              class="nls-font-500 text-primary"
            />
          </div>

          <div class="pt-3 pl-8">
            <p class="nls-font-500 text-12 text-dark-grey flex">
              {{ $t('message.deposit-suspension') }}
              <TooltipComponent :content="$t('message.deposit-suspension-tooltip')" />
            </p>

            <CurrencyComponent
              :fontSize="20"
              :fontSizeSmall="16"
              :type="CURRENCY_VIEW_TYPES.CURRENCY"
              :amount="depositSuspension"
              denom="%"
              :isDenomInfront="false"
              :has-space="false"
              class="nls-font-500 text-primary"
            />
          </div>
        </div>
      </div>

      <!-- <div class="block flex-1 p-[12px]">
        <div class="flex items-center justify-between px-4 pt-2 pb-0">
          <h2 class="text-16 nls-font-500 text-left my-0 text-primary">
            &nbsp;
          </h2>
        </div>
        <div class="block border-b border-standart">
          <div class="grid gap-6px-3 md:px-4 py-2 items-center justify-between earn-asset grid-cols-3 md:grid-cols-3">
            <div class="inline-flex items-center col-span-2 lg:ml-0 ml-6">
              <div class="inline-block">

                <div class="pt-3">
                  <p class="nls-font-500 text-12 text-dark-grey flex">
                    {{ $t('message.neutron') }}
                  </p>

                  <CurrencyComponent
                    :fontSize="28"
                    :fontSizeSmall="22"
                    :type="CURRENCY_VIEW_TYPES.CURRENCY"
                    :amount="'0.00'"
                    denom="%"
                    :isDenomInfront="false"
                    :has-space="false"
                    class="nls-font-500 text-primary"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
        <div class="flex items-center justify-start py-4 px-6 lg:px-0">

          <div class="pt-3 lg:pl-4">
            <p class="nls-font-500 text-12 text-dark-grey flex">
              {{ $t('message.yield') }}
              <TooltipComponent :content="$t('message.yield-tooltip')" />
            </p>

            <div class="flex items-center">
              <img
                src="@/assets/icons/neutron-usdc.svg"
                class="mr-[6px]"
              />
              <CurrencyComponent
                :fontSize="20"
                :fontSizeSmall="16"
                :type="CURRENCY_VIEW_TYPES.CURRENCY"
                :amount="'0'"
                denom="%"
                :isDenomInfront="false"
                :has-space="false"
                class="nls-font-500 text-primary"
              />
            </div>

          </div>

          <div class="pt-3 lg:pl-6">
            <p class="nls-font-500 text-12 text-dark-grey flex">
              {{ $t('message.optimal') }}
              <TooltipComponent :content="$t('message.optimal-tooltip')" />
            </p>

            <CurrencyComponent
              :fontSize="20"
              :fontSizeSmall="16"
              :type="CURRENCY_VIEW_TYPES.CURRENCY"
              :amount="'0'"
              denom="%"
              :isDenomInfront="false"
              :has-space="false"
              class="nls-font-500 text-primary"
            />
          </div>

          <div class="pt-3 pl-8">
            <p class="nls-font-500 text-12 text-dark-grey flex">
              {{ $t('message.deposit-suspension') }}
              <TooltipComponent :content="$t('message.deposit-suspension-tooltip')" />
            </p>

            <CurrencyComponent
              :fontSize="20"
              :fontSizeSmall="16"
              :type="CURRENCY_VIEW_TYPES.CURRENCY"
              :amount="'0'"
              denom="%"
              :isDenomInfront="false"
              :has-space="false"
              class="nls-font-500 text-primary"
            />
          </div>
        </div>
      </div> -->
    </div>

    <div class="background mt-6 shadow-box radius-medium radius-0-sm outline flex flex-col lg:flex-row">
      <div class="pt-6 px-6 lg:pb-6 pb-2">
        <p class="nls-font-500 text-16 text-primary">
          {{ $t('message.leased-assets-total') }}
        </p>
        <div class="flex flex-col lg:flex-row items-center">
          <div class="stats flex">
            <StatDaughnutChart
              ref="statChart"
              @in-focus="inFocus"
            />
          </div>
          <div class="flex flex-wrap my-4">

            <div
              v-for="(item, index) in loans"
              :key="index"
              class="lg:pl-6 self-center lg:pt-2 pt-4 px-2 basis-1/4"
            >
              <p class="nls-font-500 text-12 text-dark-grey flex">
                {{ item.name }}
              </p>

              <CurrencyComponent
                :fontSize="20"
                :fontSizeSmall="16"
                :type="CURRENCY_VIEW_TYPES.CURRENCY"
                :amount="item.loan.toString()"
                denom="%"
                :isDenomInfront="false"
                :has-space="false"
                class="nls-font-500 text-primary"
                :class="{ 'loan-active': focus.includes(item.name) }"
              />
            </div>

          </div>
        </div>
      </div>

      <div
        class="border-standart lg:border-l lg:border-b-0 lg:px-14 flex lg:items-start lg:justify-center lg:flex-col lg:mr-6 px-8 lg:py-0 py-4 border-t"
      >
        <div class="pt-3">
          <p class="nls-font-500 text-12 text-dark-grey flex">
            {{ $t('message.borrowed') }}
          </p>

          <CurrencyComponent
            :fontSize="20"
            :fontSizeSmall="16"
            :type="CURRENCY_VIEW_TYPES.CURRENCY"
            :amount="totalBorrowed"
            denom="$"
            :has-space="false"
            class="nls-font-500 text-primary"
          />
        </div>
        <div class="pt-3 lg:ml-0 ml-6">
          <p class="nls-font-500 text-12 text-dark-grey flex">
            {{ $t('message.protocol-revenue') }}
          </p>

          <CurrencyComponent
            :fontSize="20"
            :fontSizeSmall="16"
            :type="CURRENCY_VIEW_TYPES.CURRENCY"
            :amount="protocolRevenue"
            denom="$"
            :has-space="false"
            class="nls-font-500 text-primary"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
div.stats {
  width: 190px;
  height: 190px;
  margin-top: 12px;
  position: relative;
  z-index: 0;
}

@media (max-width: 680px) {
  div.stats {
    margin-top: 24px;
    width: 320px !important;
    height: 320px !important;
  }
}

.balance-box {
  div:first-of-type {
    margin-bottom: 0px !important;
  }
}
</style>

<script setup lang="ts">
import CurrencyComponent from '@/components/CurrencyComponent.vue';
import TooltipComponent from '@/components/TooltipComponent.vue';
import StatLineChart from "@/components/StatLineChart.vue";
import StatDaughnutChart from '@/components/StatDaughnutChart.vue';

import { CURRENCY_VIEW_TYPES } from '@/types/CurrencyViewType';
import { onMounted, ref } from 'vue';
import { ETL_API } from '@/config/env';
import { useI18n } from 'vue-i18n';
import { useWalletStore } from '@/stores/wallet';
import { useApplicationStore } from '@/stores/application';

const i18n = useI18n();
const totalValueLocked = ref('0');
const borrowApr = ref('0');
const utilizationLevel = ref('0');
const optimal = ref('70');
const depositSuspension = ref('65');
const distributed = ref('0');
const totalBorrowed = ref('0');
const protocolRevenue = ref('0');
const buybackTotal = ref('0');
const incentivesPool = ref('0');

const chartElement = ref<typeof StatLineChart>();
const statChart = ref<typeof StatDaughnutChart>();
const loans = ref<{ loan: number, name: string }[]>();
const app = useApplicationStore();
const focus = ref<string[]>([])
const suppliedBorrowed = ref({
  supplied: '0',
  borrowed: '0'
})

const wallet = useWalletStore();

const chartData = {
  datasets: [
    {
      label: i18n.t("message.supplied"),
      borderColor: "#2868E1",
      data: [

      ] as any,
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: i18n.t("message.borrowed"),
      borderColor: "#FF562E",
      data: [

      ] as any,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

onMounted(async () => {
  await Promise.all([
    setTotalValueLocked(),
    setBorrowApr(),
    setTimeSeries(),
    setUtilization(),
    setDistributed(),
    setTotalBorrowed(),
    setProtocolRevenue(),
    setStats(),
    setBuyBackTotal(),
    setIncentivesPool()
  ]).catch(() => { })
});

function inFocus(data: string[]) {
  focus.value = data;
}

function inStatLineFocus(data: string[], index: number) {

  if (index < 0) {
    return setLastIndex();
  }

  const [s, b] = chartElement.value!.getChartData().datasets;
  const [_s, svalue] = s.data[index];
  const [_b, bvalue] = b.data[index];
  suppliedBorrowed.value.supplied = svalue;
  suppliedBorrowed.value.borrowed = bvalue;

}

function setLastIndex() {
  const [s, b] = chartElement.value!.getChartData().datasets;
  const [_s, svalue] = s.data[s.data.length - 1];
  const [_b, bvalue] = b.data[b.data.length - 1];
  suppliedBorrowed.value.supplied = svalue;
  suppliedBorrowed.value.borrowed = bvalue;
}

async function setTotalValueLocked() {
  const data = await fetch(`${ETL_API}/total-value-locked`);
  const item = await data.json();
  totalValueLocked.value = item.total_value_locked;
}

async function setBorrowApr() {
  const data = await fetch(`${ETL_API}/borrow-apr`);
  const item = await data.json();
  borrowApr.value = item[0];
}

async function setTimeSeries() {
  const data = await fetch(`${ETL_API}/time-series`);
  const items = await data.json();

  let dataBorrowed = [];
  let dataSupplied = [];

  for (const item of items) {

    dataSupplied.push([
      new Date(item.lp_pool_timestamp).getTime(),
      item.supplied
    ]);

    dataBorrowed.push([
      new Date(item.lp_pool_timestamp).getTime(),
      item.borrowed
    ]);

  }

  chartElement.value?.updateChart(dataSupplied, dataBorrowed);
  setLastIndex();

}

async function setUtilization() {
  const data = await fetch(`${ETL_API}/utilization-level`);
  const item = await data.json();
  utilizationLevel.value = item[0];
}

async function setDistributed() {
  const data = await fetch(`${ETL_API}/distributed`);
  const item = await data.json();
  distributed.value = item.distributed;
}

async function setTotalBorrowed() {
  const data = await fetch(`${ETL_API}/borrowed`);
  const item = await data.json();
  totalBorrowed.value = item.borrowed;
}

async function setProtocolRevenue() {
  const data = await fetch(`${ETL_API}/revenue`);
  const item = await data.json();
  protocolRevenue.value = item.revenue;
}

async function setStats() {

  const data = await fetch(`${ETL_API}/leased-assets`);
  const items: { loan: string, asset: string }[] = await data.json();
  const labels = [];
  const colors = [];
  const dataValue = [];
  let total = 0;

  for (const i of items) {
    const currency = wallet.getCurrencyByTicker(i.asset);
    labels.push(currency?.shortName ?? i.asset);
    dataValue.push(i.loan);
    colors.push(strToColor(currency?.shortName ?? i.asset));
    total += Number(i.loan);
  }

  loans.value = items.map((item) => {
    const currency = wallet.getCurrencyByTicker(item.asset);

    const loan = (Number(item.loan) / total) * 100;
    return {
      name: currency?.shortName ?? item.asset,
      loan: loan
    }
  }).sort((a, b) => {
    return b.loan - a.loan;
  });

  statChart.value?.updateChart(labels, colors, dataValue);

}

function strToColor(str: string) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

async function setBuyBackTotal() {
  const data = await fetch(`${ETL_API}/buyback-total`);
  const item = await data.json();
  buybackTotal.value = item.buyback_total;
}

async function setIncentivesPool() {
  const data = await fetch(`${ETL_API}/incentives-pool`);
  const item = await data.json();
  incentivesPool.value = item.incentives_pool;
}
</script>