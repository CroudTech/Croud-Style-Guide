import Vue from 'vue'
import axios from 'axios'
import Datatable from '../../../src/components/shared/Datatable'

const mock = jest.fn(() => Promise.resolve({
    data: {
        data: [
            { id: 3 },
            { id: 4 },
        ],
        meta: {
            pagination: {
                count: 2,
                current_page: 1,
                links: {},
                per_page: 15,
                total: 2,
                total_pages: 1,
            },
        },
    },
}))

axios.get = mock
const Constructor = Vue.extend(Datatable)

const vm = new Constructor({
    propsData: {
        vuetableConfig: {
            fields: ['id'],
            'api-url': 'test-url',
        },
    },
}).$mount()

const local = new Constructor({
    propsData: {
        vuetableConfig: {
            fields: ['id'],
            'api-mode': false,
            data: [{ id: 1 }, { id: 2 }],
        },
    },
}).$mount()

describe('Datatable', () => {
    describe('local data', () => {
        it('should not show pagination', () => {
            expect(Object.keys(local.$refs)).not.toContain('paginationInfo')
            expect(Object.keys(local.$refs)).not.toContain('pagination')
        })

        it('should match the snapshot', () => {
            expect(local.$el).toMatchSnapshot()
        })

        describe('no data', () => {
            it('should match the snapshot', (done) => {
                local.vuetableConfig.data = []
                setTimeout(() => {
                    expect(local.$el).toMatchSnapshot()
                    done()
                }, 1000)
            })
        })
    })

    describe('remote data', () => {
        it('should request remote data', () => {
            expect(mock.mock.calls).not.toBe(0)
        })

        it('should show pagination', () => {
            expect(Object.keys(vm.$refs)).toContain('paginationInfo')
            expect(Object.keys(vm.$refs)).toContain('pagination')
        })

        it('should match the snapshot', (done) => {
            vm.$nextTick(() => {
                expect(vm.$el).toMatchSnapshot()
                done()
            })
        })
    })
})
