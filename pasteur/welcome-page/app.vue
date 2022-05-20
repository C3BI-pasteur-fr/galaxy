<script setup>
import { ref, computed } from "vue";

const yCardMargin = ref("my-5");
const numToolsToDisplay = ref(20);
const howTos = ref([
  {
    title: "How to use Galaxy",
    items: [
      {
        link: {
          text: "Learn how to use Galaxy",
          href: "http://wiki.galaxyproject.org/Learn",
        },
      },
      {
        link: {
          text: "History Introduction",
          href: "https://galaxy.pasteur.fr/tours/core.history",
        },
        description: "A detailed introduction to the Galaxy History",
      },
      {
        link: {
          text: "Galaxy UI",
          href: "https://galaxy.pasteur.fr/tours/core.galaxy_ui",
        },
        description: "A gentle introduction to the Galaxy User Interface",
      },
      {
        link: {
          text: "Scratchbook - Introduction",
          href: "https://galaxy.pasteur.fr/tours/core.scratchbook",
        },
        description:
          "An introduction on how to display multiple datasets and visualizations next to each other.",
      },
      {
        link: {
          text: "Pasteur Galaxy Initiation slides",
          href: "https://c3bi-pasteur-fr.github.io/Galaxy_training_material/galaxy_initiation/slides/galaxy_initiation#1",
        },
      },
    ],
  },
  {
    title: "How to cite Galaxy",
    items: [
      {
        link: {
          text: "Citing Galaxy",
          href: "https://wiki.galaxyproject.org/CitingGalaxy",
        },
      },
      {
        link: {
          text: "If you use Galaxy@Pasteur please cite this publication",
          href: "https://doi.org/10.7490/f1000research.1114334.1",
        },
        description: "10.7490/f1000research.1114334.1",
      },
    ],
  },
]);
const pasteurUserInfos = ref([
  {
    link: {
      href: "https://c3bi-pasteur-fr.github.io/Galaxy_training_material/galaxy_initiation/slides/upload_Pasteur#1",
      text: "Instructions on how to import big data",
    },
    borderTop: true,
  },
  {
    link: {
      text: "Galaxy Initiation slides",
      href: "https://c3bi-pasteur-fr.github.io/Galaxy_training_material/galaxy_initiation/slides/galaxy_initiation#1",
    },
    borderTop: false,
  },
  {
    link: {
      text: "If you need a new tool or a new genome index for an existing tool (bwa, blast, star...)",
      href: "mailto:galaxy@pasteur.fr",
    },
    borderTop: false,
  },
]);

const { data: tools } = await useLazyFetch(
  "https://galaxy.pasteur.fr/static/pasteur/tools.json"
);
const computedTools = computed(() => {
  return tools.value
    ? tools.value
        .map((tool) => ({
          ...tool,
          create_time: new Date(tool.create_time),
        }))
        .sort((a, b) => b.create_time - a.create_time)
        .slice(0, numToolsToDisplay.value)
    : [];
});

const sectionClass = computed(
  () => containerClass.value + " " + yCardMargin.value
);
const containerClass = ref("container");
</script>
<template>
  <div class="py-4">
    <div :class="sectionClass">
      <div class="jumbotron">
        <div class="container">
          <h1>Welcome to Galaxy@Pasteur</h1>
          <hr class="my-4" />
          <img
            src="@/assets/LogoIP-CNRS-C3BI.png"
            alt="Galaxy Pasteur C3BI"
            width="350"
          />
        </div>
      </div>
      <div class="row">
        <div v-for="howTo in howTos" :key="howTo.title" class="col-sm">
          <div class="card">
            <div class="card-header border-bottom-0">
              <h3>{{ howTo.title }}</h3>
            </div>
            <div v-if="howTo.items" class="list-group list-group-flush">
              <a
                v-for="item in howTo.items"
                :key="item.link.text"
                :href="item.link.href"
                class="list-group-item list-group-item-action"
              >
                <h4 class="mb-1">{{ item.link.text }}</h4>
                <p v-if="item.description" class="mb-1">
                  {{ item.description }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="sectionClass">
      <div class="card">
        <div class="card-header border-bottom-0">
          <h3>Pasteur users</h3>
        </div>
        <div v-if="pasteurUserInfos" class="list-group list-group-flush">
          <a
            v-for="item in pasteurUserInfos"
            :key="item.link.text"
            :href="item.link.href"
            class="list-group-item list-group-item-action"
            :class="item.borderTop ? 'null' : 'border-top-0'"
          >
            <h4 class="mb-1">
              {{ item.link.text }}
            </h4></a
          >
        </div>
      </div>
    </div>
    <div :class="sectionClass">
      <ClusterLoad />
    </div>
    <div id="new-tools" :class="sectionClass">
      <div class="card">
        <div class="card-header"><h3>New tools</h3></div>
        <div class="card-body">
          <div class="warningmessagelarge" style="font-size: 1.2rem">
            When tools are updated, workflows using them might need to be
            updated as well.
          </div>

          <!-- <div class="card">
            <div class="card-body"> -->
          <!-- <h4 class="card-title font-weight-bold">
                New tools versions for:
              </h4> -->
          <div class="table-responsive">
            <table class="table table-borderless table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tool name</th>
                  <th scope="col">Version</th>
                  <th scope="col">Update time</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tool, i) in computedTools" :key="tool.id">
                  <th scope="row">{{ i + 1 }}</th>
                  <td>{{ tool.name }}</td>
                  <td>{{ tool.version }}</td>
                  <td>{{ tool.create_time.toDateString() }}</td>
                  <td>{{ tool.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- </div>
          </div> -->
        </div>
      </div>
    </div>
    <div :class="sectionClass">
      <div
        class="infomessagelarge"
        :class="yCardMargin"
        style="font-size: 1.2rem"
      >
        If you have some technical problem, you can send an email to
        <a
          target="_blank"
          class="reference alert-link"
          href="mailto:galaxy@pasteur.fr"
          >Pasteur galaxy support</a
        >.
      </div>
    </div>
    <div :class="sectionClass">
      <p>
        <a target="_blank" class="reference" href="http://galaxyproject.org/">
          Galaxy</a
        >
        is an open platform for supporting data intensive research. Galaxy is
        developed by
        <a
          target="_blank"
          class="reference"
          href="https://galaxyproject.org/galaxy-team/"
          >The Galaxy Team</a
        >
        with the support of
        <a
          target="_blank"
          class="reference"
          href="https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTORS.md"
          >many contributors</a
        >.
      </p>
      <footer>
        The
        <a target="_blank" class="reference" href="http://galaxyproject.org/"
          >Galaxy Project</a
        >
        is supported in part by
        <a target="_blank" class="reference" href="http://www.genome.gov"
          >NHGRI</a
        >,
        <a target="_blank" class="reference" href="http://www.nsf.gov">NSF</a>,
        <a target="_blank" class="reference" href="http://www.huck.psu.edu"
          >The Huck Institutes of the Life Sciences</a
        >,
        <a target="_blank" class="reference" href="http://www.ics.psu.edu"
          >The Institute for CyberScience at Penn State</a
        >, and
        <a target="_blank" class="reference" href="http://www.jhu.edu/"
          >Johns Hopkins University</a
        >.
      </footer>
    </div>
  </div>
</template>

<style>
@import "../../static/style/base.css";
</style>
