import type { Meta, StoryObj } from '@storybook/vue3';
import App from './App.vue';

// 1. 전체적인 컴포넌트 설정 (메타데이터)
const meta: Meta<typeof App> = {
  title: 'Pages/MainApp', // 스토리북 왼쪽 메뉴에서 보일 이름
  component: App,
  parameters: {
    // 컴포넌트에 대한 설명을 추가할 수 있습니다.
    docs: {
      description: {
        component: 'Vite와 Vue 로고 링크, 그리고 HelloWorld 컴포넌트를 포함하는 메인 레이아웃입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof App>;

// 2. 기본 상태 (Default)
export const Default: Story = {
  render: () => ({
    components: { App },
    template: '<App />',
  }),
};

// 3. 엣지 케이스 시뮬레이션: 모바일 화면 (Viewport 테스트)
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

// 4. 엣지 케이스 시뮬레이션: 다크 모드 (배경색 변경)
export const DarkBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};