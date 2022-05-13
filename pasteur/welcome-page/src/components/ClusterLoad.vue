<script setup>
import { reactive, watch, computed } from "vue";
import { useFetch } from "@vueuse/core";
import * as Plot from "@observablehq/plot";

const { data, error } = useFetch(
  "https://galaxy.pasteur.fr/static/pasteur/cluster-load-over-time.json"
)
  .get()
  .json();
const domain = reactive([0, 100]);
const computedData = computed(() => {
  if (data.value) {
    return data.value.map((load) => ({
      ...load,
      date: new Date(load.date),
      cluster: "maestro",
    }));
  } else {
    return null;
  }
});

const chart = computed(() => {
  if (computedData.value) {
    return Plot.plot({
      style: {
        width: "100%",
        "max-width": "100%",
        // height: "auto",
      },
      grid: true,
      width: 800,
      height: 300,
      // inset: 10,
      color: {
        legend: true,
        type: "linear",
        scheme: "rdylgn",
        // range: ["green", "red"],
        // interpolate: "hcl",
        domain,
        reverse: true,
        label: "Cluster load (%)",
      },
      x: {
        label: "Time",
        type: "time",
        // nice: true,
        line: true,
        // domain: [computedData.value[0].date, computedData.value.at(-1).date],
        // tickFormat: "%H:%M",
      },

      y: { label: "Cluster Load (%)", domain: [0, 100], line: true },
      marks: [
        // Plot.ruleY([0]),
        Plot.line(computedData.value, {
          title: (d) =>
            `cluster load : ${d.load}% \n Date: ${d.date.toTimeString()}`,
          // title: "test",
          x: "date",
          y: "load",

          // curve: "linear",
          z: "cluster",
          stroke: "load",
          // marker: "circle",
        }),
      ],
    });
  } else {
    return null;
  }
});

watch(chart, (newChart) => {
  if (newChart) {
    document.getElementById("cluster-load-chard").appendChild(newChart);
  }
});
console.log(computedData);
</script>
<template>
  <div class="card">
    <div v-if="error">
      {{ error }}
    </div>
    <div class="card-body">
      <div id="cluster-load-chard"></div>
    </div>
  </div>
</template>
