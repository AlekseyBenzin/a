import shallow from 'zustand/shallow'

import useParameters from '@/helpers/parameters'
import { getSaveValue } from '@/libs/saves'

import { Model } from '../model'

const selector = state => getSaveValue(state, 'booleans')

export default function Body() {
  const params = useParameters(selector, shallow)

  return (
    <>
      {!params.male && (
        <Model
          name="Head"
          material="body"
          texture="body"
          emotions={{
            Upper: 'eyes_eyelids_up',
            Lower: 'eyes_eyelids_down',
            Angry: 'eyes_eyelids_angry',
            Sad: 'eyes_eyelids_sad',
            Grin: 'jaw_open',
            Happy: 'jaw_happy',
            MouthSad: 'jaw_sad',
            MouthO: 'jaw_surprised',
            Cat: 'jaw_cat'
          }}
        />
      )}

      {params.male && (
        <Model
          name="Head_male"
          material="body"
          texture="body"
          emotions={{
            Upper: 'eyes_eyelids_up',
            Lower: 'eyes_eyelids_down',
            Angry: 'eyes_eyelids_angry',
            Sad: 'eyes_eyelids_sad',
            Grin: 'jaw_open',
            Happy: 'jaw_happy',
            MouthSad: 'jaw_sad',
            MouthO: 'jaw_surprised',
            Cat: 'jaw_cat'
          }}
        />
      )}

      <Model name="Body" material="body" texture="body" />
      <Model name="Hooves" material="body" texture="body" />

      <Model
        name="Ears"
        material="ears"
        file={{ group: 'ears/', key: 'ears' }}
        texture={{ group: 'ears/', key: 'ears' }}
      />

      <Model
        name="Horn_front"
        material="horn_front"
        file={{ group: 'horn_front/', key: 'horn_front' }}
        texture="white"
      />

      <Model
        name="Horn"
        material="horns"
        file={{ group: 'horns/', key: 'horn' }}
      />

      <Model
        name="Hair"
        material="hair"
        file={{ group: 'hairs/', key: 'hair' }}
        texture={{ group: 'hairs/', key: 'hair', postfix: '_second' }}
      />

      <Model
        name="Tail"
        material="tail"
        file={{ group: 'tails/', key: 'tail' }}
        texture={{ group: 'tails/', key: 'tail', postfix: '_second' }}
      />

      <Model
        name="Eyes"
        material="eyes"
        texture={{ group: 'eyes/', key: 'eyes' }}
      />

      {!params.male && <Model name="Eyelashes" material="eyelashes" />}

      {!params.male && params.canine_nose_enable && (
        <Model name="Canine" material="canine" />
      )}

      {params.male && params.canine_nose_enable && (
        <Model name="Canine_male" material="canine" />
      )}

      {params.fluff_cheeks && <Model name="Cheeks_fluff" material="fluff2" />}
      {params.fluff_chest && <Model name="Chest_fluff" material="fluff2" />}
      {params.fluff_neck && <Model name="Neck_fluff" material="fluff" />}
      {params.fluff_hooves && <Model name="Hooves_fluff" material="fluff" />}

      {!params.male && (
        <Model
          name="Fangs"
          material="fangs"
          file={{ group: 'fangs/', key: 'fangs' }}
        />
      )}

      {params.male && (
        <Model
          name="Fangs_male"
          material="fangs"
          file={{ group: 'fangs_male/', key: 'fangs', postfix: '_male' }}
        />
      )}

      <Model
        name="Teeth"
        material="teeth"
        emotions={{
          MouthO: 'jaw_surprised',
          Sharp: 'sharp_teeth',
          Male: 'male_morph'
        }}
      />

      <Model
        name="Tongue"
        material="tongue"
        emotions={{
          Open: 'jaw_surprised',
          Out: 'tongue_out',
          Raised: 'tongue_raised'
        }}
      />
    </>
  )
}
