import Vue from 'vue'
import { param } from 'jquery'
import ExportButton from '../../../src/components/shared/buttons/ExportButton'

const Constructor = Vue.extend(ExportButton)

const vm = new Constructor({
    propsData: {
        url: 'http://test.com',
    },
}).$mount()

const exportPaths = {
    'handle array of ids': {
        params: {
            search: 'search_term',
            query: {
                client_ids: [123, 456, 789],
            },
        },
    },
    'single query id': {
        params: {
            search: '',
            query: {
                client_id: 123,
            },
        },
    },
    'handles empty objects / arrays': {
        params: {
            search: '',
            query: {
                client_id: 123,
                object: {},
                array: [],
            },
            object: {},
            array: [],
        },
    },
    'handles deep objects recursively': {
        params: {
            search: '',
            query: {
                client_id: 123,
                deepObject: {
                    evenDeeper: {
                        internal: true,
                        assets: {
                            channels: [
                                { id: 1 },
                                { id: 2 },
                                { id: 3 },
                                4,
                                5,
                                'four',
                                {},
                            ],
                            another: {
                                test: true,
                            },
                        },
                    },
                },
            },
        },
    },
}

describe('Export Button', () => {
    it('should match the snapshot', () => {
        expect(vm.$el).toMatchSnapshot()
    })
})

describe('urlParamGen', () => {
    Object.keys(exportPaths).forEach((path) => {
        test(`${path}`, () => {
            expect(
                vm.urlParamGen(exportPaths[path].params)).toBe(param(exportPaths[path].params))
        })
    })
})

describe('exportUrl', () => {
    it('should not append params if additionalParams are not provided', () => {
        expect(vm.exportUrl).toBe('http://test.com')
    })

    it('should append params if additionalParams are provided', () => {
        vm.additionalParams = {
            search: 'search_term',
            query: {
                client_ids: [123, 456, 789],
            },
        }
        expect(vm.exportUrl).toBe('http://test.com?search=search_term&query%5Bclient_ids%5D%5B%5D=123&query%5Bclient_ids%5D%5B%5D=456&query%5Bclient_ids%5D%5B%5D=789')
    })

    it('export url should not contain a ? symbol if urlParams is empty', () => {
        vm.url = 'http://test.com'
        vm.additionalParams = {}
        expect(vm.exportUrl).toBe('http://test.com')
    })
})
