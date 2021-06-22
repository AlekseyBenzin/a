import { BufferGeometry } from 'three'
import create from 'zustand'

import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

import Materials from '@/configs/materials.json'

import { createMaterials } from '@/libs/materials'

const useResources = create((set) => ({
  geometries: {
    Empty: new BufferGeometry(),
  },

  materials: createMaterials(Materials),
  textures: {},

  light: {},
  ambientLight: {},

  skeleton: {},

  addGeometry: (key, geometry) =>
    set((state) => ({ geometries: { ...state.geometries, [key]: geometry } })),

  addTexture: (key, texture) =>
    set((state) => ({ textures: { ...state.textures, [key]: texture } })),

  setLight: (light) => set({ light }),
  setAmbientLight: (ambientLight) => set({ ambientLight }),

  setSkeleton: (skeleton) =>
    set({ skeleton: SkeletonUtils.clone(skeleton).children[1].skeleton }),
}))

export default useResources
