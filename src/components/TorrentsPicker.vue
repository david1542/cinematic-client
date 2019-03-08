<template>
  <div class="select-container">
    <span class="label">{{ $t('pickTorrent') }}:</span>
    <select
      class="select-input"
      @change="change"
    >
      <option
        :key="torrent.infoHash"
        :value="torrent"
        v-for="torrent in torrents"
      >
        {{ torrent.title }}
      </option>
    </select>
    <div class="caret">
      <i class="fas fa-caret-down"></i>
    </div>
    <div
      v-if="selectedTorrent"
      class="torrent-info"
    >
      <span class="peers">
        <span>
          <i class="fas fa-arrow-down"></i>
        </span>
        {{ peers }} {{ $t('peers') }}
      </span>
      <span class="seeds">
        <span>
          <i class="fas fa-arrow-up"></i>
        </span>
        {{ seeds }} {{ $t('seeds') }}
      </span>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral'
export default {
  name: 'TorrentsPicker',
  props: {
    torrents: {
      required: true,
      type: Array
    },
    torrentIndex: {
      required: true,
      type: Number
    }
  },
  methods: {
    change (e) {
      const index = e.target.selectedIndex
      this.$emit('change', index)
    }
  },
  computed: {
    selectedTorrent () {
      if (!this.torrents) return null

      return this.torrents[this.torrentIndex]
    },
    peers () {
      return numeral(this.selectedTorrent.peers).format('0,0')
    },
    seeds () {
      return numeral(this.selectedTorrent.seeds).format('0,0')
    }
  }
}
</script>

<style scoped>
.torrent-info {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 23px;
  display: flex;
  align-items: center;
  color: white;
}

.torrent-info > .peers > span > i,
.torrent-info > .seeds > span > i {
  font-size: 17px;
}

.torrent-info > .peers > span,
.torrent-info > .seeds > span {
  border-radius: 50%;
  display: inline-flex;
  width: 25px;
  height: 25px;
  padding-right: 1px;
  justify-content: center;
  align-items: center;
}

.torrent-info > span {
  margin-right: 16px;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.1px;
}

.torrent-info > span > span {
  margin-right: 3px;
}

.rtl .torrent-info > span > span {
  margin-right: 0;
  margin-left: 3px;
}

.rtl .torrent-info > span {
  margin-right: 0;
  margin-left: 16px;
}

.torrent-info > .peers > span {
  background-color: red;
}

.rtl .torrent-info > .peers > span {
  padding-right: 2px;
}

.torrent-info > .seeds > span {
  background-color: green;
}

.rtl .torrent-info {
  left: initial;
  right: 0;
  direction: rtl;
}

.select-container {
  position: relative;
  width: 300px;
  margin-right: 10px;
}

.rtl .select-container {
  margin-right: 0;
  margin-left: 10px;
}

.label {
  color: white;
  font-weight: bold;
  font-size: 15px;
  float: left;
}

.rtl .label {
  float: right;
  direction: rtl;
}

select.select-input {
  background-color: #808B90;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 7px 50px 7px 13px;
}

.rtl select.select-input {
  direction: rtl;
  text-align: right;
  padding: 7px 13px 7px 50px;
}

select.select-input > option {
  background-color: #808B90;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 7px 50px 7px 13px;
}
select.select-input:focus + .select-container > .caret > i  {
  transform: rotate(180deg);
}
.select-container > .caret {
  position: absolute;
  top: 17px;
  right: 7px;
  bottom: 0;
  display: flex;
  align-items: center;
}

.rtl .select-container > .caret {
  right: initial;
  left: 7px;
}

.select-container > .caret > i {
  color: white;
  font-size: 22px;
}
</style>
