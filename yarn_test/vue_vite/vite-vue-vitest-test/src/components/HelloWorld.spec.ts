// src/components/HelloWorld.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld.vue 커버리지 채우기', () => {
  it('버튼을 클릭하면 count가 증가해야 한다 (13번 줄 실행)', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } })
    const button = wrapper.find('button')
    
    // 13번 줄(count.value++)을 실행시키기 위해 클릭 이벤트 발생
    await button.trigger('click')
    
    expect(button.text()).toContain('count is 1')
  })
})