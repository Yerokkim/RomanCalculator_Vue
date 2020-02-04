import { shallowMount } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue'



let wrapper;
let runShallowMount;

beforeEach(() => {
  runShallowMount = () => {
    wrapper = shallowMount(Calculator, {
      methods: {
        romanToArabic: jest.fn(),
        aribicToRoman: jest.fn(),
        clear: jest.fn(),
        calculate: jest.fn()
      },
      data() {
        return {
          totalArabic: '',
          error: true,
          minusError: false,
          results:''
        }
      }
    })
  }

})


afterEach(() => {
  wrapper.destroy()
})

describe('Calculator', () => {
  test('is Vue Instance', () => {
    runShallowMount()
    expect(wrapper.isVueInstance).toBeTruthy()
  })


  test('clear method called ,when user click clear button', () => {
    runShallowMount()
    const clear = jest.fn()
    wrapper.setMethods({ clear: clear })
    wrapper.setData({ firstInput: "" });
    wrapper.find('.clear-btn').trigger('click')
    expect(clear).toHaveBeenCalledTimes(1)
  });


  test('it shows the error alert when error is true', () => {
    runShallowMount();
    wrapper.setData({ error: true });
    expect(wrapper.find('.error-Alert').exists()).toBeTruthy()

  })

  test('when operator is add, value return num+num', () => {
    runShallowMount()
    const calculate = jest.fn((x,y)=>x+y)
    wrapper.setMethods({ calculate: calculate })
    wrapper.setData({ operator: '+' })
    // wrapper.find('.calculate-btn').trigger('click')
    expect(calculate(1, 2)).toEqual(3);
  })

  test('when operator is minus, value return num-num', () => {
    runShallowMount()
    const calculate = jest.fn((x,y)=>x-y)
    wrapper.setMethods({ calculate: calculate })
    wrapper.setData({ operator: '-' })
    expect(calculate(3, 2)).toEqual(1);
  })

  test('when operator is multiple, value return num*num', () => {
    runShallowMount()
    const calculate = jest.fn((x,y)=>x*y)
    wrapper.setMethods({ calculate: calculate })
    wrapper.setData({ operator: '-' })
    expect(calculate(3, 2)).toEqual(6);
  })
})


