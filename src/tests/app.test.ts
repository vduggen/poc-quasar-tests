import { mount } from '@vue/test-utils';
import { useQuasar, Quasar } from 'quasar';
import App from "../App.vue"

describe('Deve testar a tela principal', () => {
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
})