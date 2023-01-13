import { mount } from '@vue/test-utils';
import { useQuasar, Quasar } from 'quasar';
import App from "../App.vue"
import UserLocalGateway from '../infra/Gateways/UserLocalGateway';

function getWrapper() {
    return mount(App, {
        global: {
            plugins: [Quasar],
            provide: {
                quasar: useQuasar(),
                userHttpGateway: new UserLocalGateway()
            }
        }
    });
}

describe('<App />', () => {
    it('Caso não tiver nenhum usuário buscado deve estar no estado de vazio', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('[data-test=emptyState').exists()).toBe(true);
    })

    it('Caso for buscado um usuário deve sumir o estado de vazio', async () => {
        const wrapper = getWrapper();
        const usernameInput = wrapper.find('[data-test=username]');
        usernameInput.setValue('vduggen');
        const buttonFetch = wrapper.find('[data-test=buttonFetch]');
        await buttonFetch.trigger('click');
        expect(wrapper.find('[data-test=emptyState]').exists()).toBe(false);
    })

    it('Caso for buscado um usuário deve mostrar os componentes de abas e de informações do usuário', async () => {
        const wrapper = getWrapper();
        const usernameInput = wrapper.find('[data-test=username]');
        usernameInput.setValue('vduggen');
        const buttonFetch = wrapper.find('[data-test=buttonFetch]');
        await buttonFetch.trigger('click');
        expect(wrapper.find('[data-test=tabs]').exists()).toBe(true);
        expect(wrapper.find('[data-test=wrapperUserInfo]').exists()).toBe(true);
    })
})