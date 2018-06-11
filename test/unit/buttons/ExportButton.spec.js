import Vue from 'vue'
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
        expectedResult: 'search=search_term&query%5Bclient_ids%5D%5B%5D=123&query%5Bclient_ids%5D%5B%5D=456&query%5Bclient_ids%5D%5B%5D=789',
    },
    'single query id': {
        params: {
            search: '',
            query: {
                client_id: 123,
            },
        },
        expectedResult: 'search=&query%5Bclient_id%5D=123',
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
        expectedResult: 'search=&query%5Bclient_id%5D=123',
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
                                2,
                                3,
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
        expectedResult: 'search=&query%5Bclient_id%5D=123&query%5BdeepObject%5D%5BevenDeeper%5D%5Binternal%5D=true&query%5BdeepObject%5D%5BevenDeeper%5D%5Bassets%5D%5Bchannels%5D%5Bid%5D=1&query%5BdeepObject%5D%5BevenDeeper%5D%5Bassets%5D%5Bchannels%5D%5B%5D=2&query%5BdeepObject%5D%5BevenDeeper%5D%5Bassets%5D%5Bchannels%5D%5B%5D=3&query%5BdeepObject%5D%5BevenDeeper%5D%5Bassets%5D%5Bchannels%5D%5B%5D=four&query%5BdeepObject%5D%5BevenDeeper%5D%5Bassets%5D%5Banother%5D%5Btest%5D=true',
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
                vm.urlParamGen(exportPaths[path].params)).toBe(exportPaths[path].expectedResult)
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
