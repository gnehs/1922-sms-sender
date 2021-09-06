 
<template>
  <div class="main-container">
    <qrcode-stream :track="parseCode" />
    <v-bottom-sheet hide-overlay v-model="sheet" persistent>
      <v-dialog-bottom-transition>
        <v-card v-if="detectedCode" class="rounded-b-0">
          <v-card-title>偵測到實聯制條碼</v-card-title>
          <v-card-text>
            <v-text-field v-model="detectedCode" label="編號" readonly clearable />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="detectedCode = null" text :href="smsLink + encodeURIComponent(`\n同行人數：2人`)">
              2人
            </v-btn>
            <v-btn color="blue darken-1" @click="detectedCode = null" text :href="smsLink + encodeURIComponent(`\n同行人數：3人`)">
              3人
            </v-btn>
            <v-btn color="blue darken-1" @click="detectedCode = null" outlined :href="smsLink"> 傳送 </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else class="rounded-b-0">
          <v-card-title>正在偵測</v-card-title>
          <v-card-text class="text-center"> 請掃描 QR Code </v-card-text>
        </v-card>
      </v-dialog-bottom-transition>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sheet: true,
      detectedCode: null,
      smsLink: ''
    }
  },
  methods: {
    parseCode(detectedCodes, ctx) {
      for (let detectedCode of detectedCodes) {
        try {
          //show the detected code
          let raw = detectedCode.rawValue
          let code = raw
            .replace(/[ ]+/g, '')
            .match(/\d{15}/)[0]
            .match(/.{1,4}/g)
            .join(' ')
          if (this.detectedCode != code) {
            this.detectedCode = code
            let smsBody = `場所代碼：${code}\n本簡訊是簡訊實聯制發送，限防疫目的使用。`
            this.smsLink = `sms:1922;?&body=${encodeURIComponent(smsBody)}`
            this.sheet = true
            window.navigator.vibrate(100)
            //draw the bounding box
            drawLine(detectedCode.cornerPoints)
          } else {
            drawLine(detectedCode.cornerPoints, 'rgba(255, 0, 0, .5)')
          }
        } catch (e) {
          drawLine(detectedCode.cornerPoints, 'red')
        }
        function drawLine(cornerPoints, color = 'rgba(0, 0, 0, .75)') {
          const [firstPoint, ...otherPoints] = cornerPoints

          ctx.strokeStyle = color
          ctx.lineWidth = 4

          ctx.beginPath()
          ctx.moveTo(firstPoint.x, firstPoint.y)
          for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y)
          }
          ctx.lineTo(firstPoint.x, firstPoint.y)
          ctx.closePath()
          ctx.stroke()
        }
      }
    }
  }
}
</script>

<style lang="sass">
.main-container
  height: 100vh
  width: 100vw
</style>