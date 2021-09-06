 
<template>
  <div class="main-container">
    <qrcode-stream :track="parseCode" />
    <v-bottom-sheet hide-overlay v-model="sheet">
      <pre>{{ detectedCode }}</pre>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sheet: true,
      detectedCode: null
    }
  },
  methods: {
    parseCode(detectedCodes, ctx) {
      if (detectedCodes.length > 0) {
        const detectedCode = detectedCodes[0]
        //draw the bounding box
        {
          const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

          ctx.strokeStyle = 'rgba(255, 255, 255, .5)'

          ctx.beginPath()
          ctx.moveTo(firstPoint.x, firstPoint.y)
          for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y)
          }
          ctx.lineTo(firstPoint.x, firstPoint.y)
          ctx.closePath()
          ctx.stroke()
        }
        //show the detected code
        this.detectedCode = detectedCode
        this.sheet = true
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