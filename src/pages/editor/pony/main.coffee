import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue
  render: (h) -> h App

  data:
    ang: 0
    horiz: 0
    degress: 0

    hair: 'Spiky to side'

    hairSide: { transform: '' }
    hairSideAlt: { transform: 'scale(-1, 1)' }
    hairSideFront: { transform: 'scale(-1, 1) translate(-100%)' }

    tassels: on
    fangs: on
    catlike: off

    jaw: { open: 0, sad: 0 }
    teeth: { upper: 100, lower: 100 }

    eyes:
      color:
        basic: '#ffcc00'
        shade: '#b89714'

        set: { background: '#ffcc00' }
        stroke: { stroke: '#ffcc00' }

      iris: { scale: 100 }
      pupils: { width: 10, height: 100 }

      position:
        horiz: 50, verti: 50
        focus: 100, derp: 0
        mode: 'absolute'

      eyelids:
        left: { up: 0, down: 0 }
        right: { up: 0, down: 0 }

      lashes: { show: yes }

      brows:
        show: yes

        left:
          width: 100
          height: 0
          evil: 0
          wide: 0

        right:
          width: 100
          height: 0
          evil: 0
          wide: 0

    mane:
      color:
        basic: '#666666',
        shade: '#444444',
        set: { background: '#666666' }

    fur:
      color:
        basic: '#cccccc'
        shade: '#888888'
        set: { background: '#cccccc' }

    piercings:
      ring: 'M8.7 3.3h-21.3c-3 0-5.4-2.4-5.4-5.3s2.4-5.3 5.3-5.3H8.7C11.6-7.3 14-4.9 14-2s-2.4 5.3-5.3 5.3z',
      point: 'M-14,-2a12,12 0 1,0 24,0a12,12 0 1,0 -24,0',

      left: [],
      right: [{ type: 'ring', color: '#ffcc44', shade: '#ccaa22' }]

    path:
      headClip: ''
      noseClip: ''

      eyeLeftClip: ''
      eyeRightClip: ''

      earLeftClip: ''
      earRightClip: ''

      mouthClip: ''

    earClipEnabled: yes

  computed:
    faceMoveReverse: ->
      transform: "translateY(#{ @horiz * 6 }%)"

    faceMove: -> transform: "translateY(#{ -@horiz * 6 }%)"
    earsMove: -> transform: "translateY(#{ @horiz * 2 }%)"
    earsClip: -> transform: "translateY(#{ @horiz * 2 }%) " + @hairSide.transform

    earsClipAlt: ->
      transform: "translateX(100%) translateY(#{ @horiz * 2 }%) " + @hairSideAlt.transform

    headRotate: -> transform: "rotate(#{ @ang }deg)"
    headRotateHair: -> transform: "rotate(#{ @ang }deg) scale(-1, 1)"
    furStroke: -> stroke: @fur.color.basic
    furTint: -> stroke: @fur.color.shade

    furCheckedEyelashes: ->
      if @eyes.lashes.show then @eyes.color.set else false

    furCheckedEyebrows: ->
      if @eyes.brows.show then @eyes.color.set else false

    ifIsRelative: ->
      if @eyes.position.mode is "relative" then @eyes.color.set else false

    ifIsAbsolute: ->
      if @eyes.position.mode is "absolute" then @eyes.color.set else false

    leftBrowHeight: ->
      val = if @degress < 0
           @eyes.brows.left.height
      else @eyes.brows.right.height

      transform: "translateY(#{ -@horiz * 6 - val / 50 }%)"

    rightBrowHeight: ->
      val = if @degress < 0
           @eyes.brows.right.height
      else @eyes.brows.left.height

      transform: "translateY(#{ -@horiz * 6 - val / 50 }%)"

    leftBrowWidth: ->
      val = if @degress < 0
           @eyes.brows.left.width
      else @eyes.brows.right.width

      "stroke-width": 2.5 + val / 20

    rightBrowWidth: ->
      val = if @degress < 0
           @eyes.brows.right.width
      else @eyes.brows.left.width

      "stroke-width": 2.5 + val / 20

    eyesStroke: -> stroke: @eyes.color.basic
    eyesSet: -> background: @eyes.color.basic

  methods:
    createLeftRing: -> @piercings.left.push    { type: "ring",  color: "#ffcc44", shade: "#ccaa22" }
    createLeftPoint: -> @piercings.left.push   { type: "point", color: "#ffcc44", shade: "#ccaa22" }
    createRightRing: -> @piercings.right.push  { type: "ring",  color: "#ffcc44", shade: "#ccaa22" }
    createRightPoint: -> @piercings.right.push { type: "point", color: "#ffcc44", shade: "#ccaa22" }

.$mount '#app'
