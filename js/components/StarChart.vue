<template>
  <div class="container">
    <div class="row">
      <div class="column column-25">
        <GoBack></GoBack>
        <h3>Star Chart</h3>
        <p>
          This demo page utilizes the `/v2/studio/star-chart` endpoint to
          generate star charts.
        </p>
        <form>
          <fieldset>
            <label>Longitude</label>
            <input v-model="longitude" type="text" />
            <label>Latitude</label>
            <input v-model="latitude" type="text" />
            <label>Date</label>
            <input v-model="date" type="date" />
            <label>Style</label>
            <select v-model="style">
              <option :value="key" v-for="(name, key) in styles">{{
                name
              }}</option></select
            >
            <label>Type</label>
            <select v-model="type">
              <option value="area">Area</option>
              <option value="constellation">Constellation</option>
            </select>
            <label v-if="type == 'constellation'">Constellation</label>
            <select v-model="constellation" v-if="type == 'constellation'">
              <option :value="key" v-for="(name, key) in constellations">{{
                name
              }}</option>
            </select>
            <label v-if="type == 'area'">Right Ascension</label>
            <input v-if="type == 'area'" v-model="ra" type="number" />
            <label v-if="type == 'area'">Declination</label>
            <input v-if="type == 'area'" v-model="dec" type="number" />
            <label v-if="type == 'area'">Zoom</label>
            <input v-if="type == 'area'" v-model="zoom" type="number" />
            <button @click="generate">Generate</button>
          </fieldset>
        </form>
      </div>
      <div class="column column-75">
        <div v-if="loading">{{ status }}</div>
        <div v-if="imageUrl"><img :src="imageUrl" /></div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoBack from "./Goback.vue";
  import Config from "../config.json";

  export default {
    components: {
      GoBack: GoBack,
    },
    data() {
      return {
        constellations: {
          and: "Andromeda",
          ant: "Antlia",
          aps: "Apus",
          aqr: "Aquarius",
          aql: "Aquila",
          ara: "Ara",
          ari: "Aries",
          aur: "Auriga",
          boo: "Boötes",
          cae: "Caelum",
          cam: "Camelopardalis",
          cnc: "Cancer",
          cvn: "Canes Venatici",
          cma: "Canis Major",
          cmi: "Canis Minor",
          cap: "Capricornus",
          car: "Carina",
          cas: "Cassiopeia",
          cen: "Centaurus",
          cep: "Cepheus",
          cet: "Cetus",
          cha: "Chamaeleon",
          cir: "Circinus",
          col: "Columba",
          com: "Coma Berenices",
          cra: "Corona Austrina",
          crb: "Corona Borealis",
          crv: "Corvus",
          crt: "Crater",
          cru: "Crux",
          cyg: "Cygnus",
          del: "Delphinus",
          dor: "Dorado",
          dra: "Draco",
          equ: "Equuleus",
          eri: "Eridanus",
          for: "Fornax",
          gem: "Gemini",
          gru: "Grus",
          her: "Hercules",
          hor: "Horologium",
          hya: "Hydra",
          hyi: "Hydrus",
          ind: "Indus",
          lac: "Lacerta",
          leo: "Leo",
          lmi: "Leo Minor",
          lep: "Lepus",
          lib: "Libra",
          lup: "Lupus",
          lyn: "Lynx",
          lyr: "Lyra",
          men: "Mensa",
          mic: "Microscopium",
          mon: "Monoceros",
          mus: "Musca",
          nor: "Norma",
          oct: "Octans",
          oph: "Ophiuchus",
          ori: "Orion",
          pav: "Pavo",
          peg: "Pegasus",
          per: "Perseus",
          phe: "Phoenix",
          pic: "Pictor",
          psc: "Pisces",
          psa: "Piscis Austrinus",
          pup: "Puppis",
          pyx: "Pyxis",
          ret: "Reticulum",
          sge: "Sagitta",
          sgr: "Sagittarius",
          sco: "Scorpius",
          scl: "Sculptor",
          sct: "Scutum",
          ser: "Serpens Caput",
          ser: "Serpens Cauda",
          sex: "Sextans",
          tau: "Taurus",
          tel: "Telescopium",
          tri: "Triangulum",
          tra: "Triangulum Australe",
          tuc: "Tucana",
          uma: "Ursa Major",
          umi: "Ursa Minor",
          vel: "Vela",
          vir: "Virgo",
          vol: "Volans",
          Vul: "Vulpecula",
        },
        styles: {
          default: "Default",
          inverted: "Inverted",
          navy: "Navy",
          red: "Red",
        },
        longitude: "-84.39733",
        latitude: "33.775867",
        date: moment().format("YYYY-MM-DD"),
        type: "constellation",
        constellation: "ori",
        ra: 0,
        dec: 0,
        zoom: 6,
        style: "inverted",
        imageUrl: null,
        loading: true,
        status: 'Click the "Generate" button to load the image',
      };
    },
    methods: {
      generate() {
        this.loading = true;
        this.status = "Loading...";

        const parameters = {};

        if (this.type == "constellation") {
          parameters["constellation"] = this.constellation;
        }

        if (this.type == "area") {
          parameters["position"] = {
            equatorial: {
              rightAscension: this.ra,
              declination: this.dec,
            },
          };
          parameters["zoom"] = this.zoom;
        }

        axios
          .post(
            `${Config.apiEndpoint}/api/v2/studio/star-chart`,
            {
              style: this.style,
              observer: {
                latitude: this.latitude,
                longitude: this.longitude,
                date: moment(this.date).format("YYYY-MM-DD"),
              },
              view: {
                type: this.type,
                parameters,
              },
            },
            {
              headers: {
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Basic ${btoa(
                  `${Config.appId}:${Config.appSecret}`
                )}`,
              },
            }
          )
          .then((response) => {
            this.imageUrl = response.data.data.imageUrl;

            this.loading = false;
          });
      },
    },
  };
</script>
