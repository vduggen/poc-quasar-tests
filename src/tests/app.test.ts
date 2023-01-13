import { mount } from '@vue/test-utils';
import { useQuasar, Quasar } from 'quasar';
import App from "../App.vue"

describe('<App />', () => {
    it('Caso não tiver nenhum usuário buscado deve estar no estado de vazio', () => {
        const wrapper = mount(App, {
            global: {
                plugins: [Quasar],
                provide: {
                    quasar: useQuasar()
                }
            }
        });
        expect(wrapper.find('[data-test=emptyState').exists()).toBe(true);
    })

    it('Caso for buscado um usuário deve sumir o estado de vazio', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [Quasar],
                provide: {
                    quasar: useQuasar()
                }
            }
        });
        const usernameInput = wrapper.find('[data-test=username]');
        usernameInput.setValue('vduggen');
        const buttonFetch = wrapper.find('[data-test=buttonFetch]');
        buttonFetch.trigger('click');
        await new Promise((resolve) => {
            setTimeout(() => resolve(''), 300);
        })
        expect(wrapper.find('[data-test=emptyState]').exists()).toBe(false);
    })

    it('Caso for buscado um usuário deve mostrar os componentes de abas e de informações do usuário', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [Quasar],
                provide: {
                    quasar: useQuasar()
                }
            }
        });
        const usernameInput = wrapper.find('[data-test=username]');
        usernameInput.setValue('vduggen');
        const buttonFetch = wrapper.find('[data-test=buttonFetch]');
        buttonFetch.trigger('click');
        await new Promise((resolve) => {
            setTimeout(() => resolve(''), 300);
        })
        expect(wrapper.find('[data-test=tabs]').exists()).toBe(true);
        expect(wrapper.find('[data-test=wrapperUserInfo]').exists()).toBe(true);
    })
})