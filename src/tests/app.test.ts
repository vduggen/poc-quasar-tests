import { mount } from '@vue/test-utils';
import { Notify, Quasar } from 'quasar';
import quasarLang from 'quasar/lang/pt-BR'
import App from "../App.vue"
import UserLocalGateway from '../gateways/UserLocalGateway';
import * as quasar from 'quasar';

function getWrapper() {
    return mount(App, {
        global: {
            plugins: [[Quasar, {
                plugins: {
                  Notify
                },
                lang: quasarLang,
            }]],
            provide: {
                quasar: Quasar,
                Notify: quasar.Notify,
                Date: quasar.date,
                userGateway: new UserLocalGateway()
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

    it('Caso o usuário não tiver nenhum repositório a aba de repositórios e forks devem estar desabilitadas', async () => {
        const wrapper = getWrapper();
        const usernameInput = wrapper.find('[data-test=username]');
        usernameInput.setValue('brunorovela');
        const buttonFetch = wrapper.find('[data-test=buttonFetch]');
        await buttonFetch.trigger('click');
        expect(wrapper.find('[data-test=tabRepos]').classes()).toContain('disabled');
        expect(wrapper.find('[data-test=tabReposFork]').classes()).toContain('disabled');
    })
})