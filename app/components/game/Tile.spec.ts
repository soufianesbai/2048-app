import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tile from './Tile.vue'

describe('Tile Component', () => {
  it('should have bg-amber-100 background when value is 2', () => {
    const wrapper = mount(Tile, {
      props: {
        value: 2
      }
    })

    const tile = wrapper.find('.tile')
    expect(tile.classes()).toContain('bg-amber-100')
  })
})
