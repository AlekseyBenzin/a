import create from 'zustand'

const useResources = create((set) => ({
  geometries: {},
  addGeometry: (key, geometry) =>
    set((state) => ({ geometries: { ...state.geometries, [key]: geometry } })),
}))

export default useResources
