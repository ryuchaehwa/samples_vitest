import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'

describe('App.vue 품질 및 렌더링 검증', () => {
  
  // 1. 기본 렌더링 확인 (정상 케이스)
  it('Vite와 Vue 로고가 정상적으로 화면에 나타나야 한다', () => {
    const wrapper = mount(App)
    const images = wrapper.findAll('img')
    
    expect(images).toHaveLength(2)
    expect(images[0].attributes('alt')).toBe('Vite logo')
    expect(images[1].attributes('alt')).toBe('Vue logo')
  })

  // 2. 외부 링크 보안 및 동작 확인 (품질 케이스)
  it('로고 클릭 시 새 탭에서 공식 문서가 열려야 한다', () => {
    const wrapper = mount(App)
    const links = wrapper.findAll('a')

    // 보안상 중요한 target="_blank" 속성 확인
    expect(links[0].attributes('href')).toBe('https://vite.dev')
    expect(links[0].attributes('target')).toBe('_blank')
    
    expect(links[1].attributes('href')).toBe('https://vuejs.org/')
    expect(links[1].attributes('target')).toBe('_blank')
  })

  // 3. 컴포넌트 간 데이터 전달 확인 (통합 테스트)
  it('HelloWorld 자식 컴포넌트에 올바른 msg 프로퍼티를 전달한다', () => {
    const wrapper = mount(App)
    const helloComponent = wrapper.findComponent(HelloWorld)
    
    // HelloWorld가 존재하는지 확인
    expect(helloComponent.exists()).toBe(true)
    // 전달된 데이터가 기획서대로 "Vite + Vue"인지 확인
    expect(helloComponent.props('msg')).toBe('Vite + Vue')
  })

  // 4. 스타일 관련 엣지 케이스 (접근성 및 성능)
  it('Vue 로고는 특정한 CSS 클래스(vue)를 가지고 있어야 한다', () => {
    const wrapper = mount(App)
    const vueLogo = wrapper.find('img.vue')
    
    // 특정 클래스가 없으면 스타일(그림자 효과 등)이 깨질 수 있음
    expect(vueLogo.exists()).toBe(true)
    expect(vueLogo.classes()).toContain('logo')
  })
})