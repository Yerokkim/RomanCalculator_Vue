<template>
  <div class="container">
    <div id="calculator">
      <div class="header">
        <h1>Roman Calculator</h1>
        <p class="error-Alert" v-if="this.error">
          This number is too big! should be smaller than 3999
        </p>

        <p v-if="this.minusError">This number should be bigger than 0 !</p>
      </div>
      <div class="display">
        <div class="display-result">
          {{ results }}
          <span>{{ totalArabic }}</span>
        </div>
        <div class="input-display">
          <div class="input-field">{{ firstInput }}</div>
          <div class="input-operator">{{ operator }}</div>
          <div class="input-field">{{ secondInput }}</div>
        </div>
      </div>

      <div class="keyboard">
        <div class="numbs">
          <button @click="displayNumb('i')">i</button>
          <button @click="displayNumb('ii')">ii</button>
          <button @click="displayNumb('iii')">iii</button>
          <button @click="displayNumb('iv')">iv</button>
          <button @click="displayNumb('v')">v</button>
          <button @click="displayNumb('vi')">vi</button>
          <button @click="displayNumb('vii')">vii</button>
          <button @click="displayNumb('viii')">viii</button>
          <button @click="displayNumb('ix')">ix</button>
          <button @click="displayNumb('x')">x</button>
          <button @click="displayNumb('l')">l</button>
          <button @click="displayNumb('c')">c</button>
          <button @click="displayNumb('d')">d</button>
          <button @click="displayNumb('m')">m</button>
        </div>
        <div class="operator">
          <button class="calculate-btn" @click="displayOperator('+')">+</button>
          <button @click="displayOperator('-')">-</button>
          <button @click="displayOperator('*')">*</button>
          <button class="clear-btn" @click="clear()">clear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      firstInput: "",
      secondInput: "",
      results: "",
      totalArabic: "",
      operator: null,
      error: false,
      minusError: false
    };
  },
  methods: {
    displayNumb(num) {
      if (!this.operator) {
        this.firstInput = num;
      } else {
        this.secondInput = num;
        this.calulate();
      }
    },
    displayOperator(op) {
      this.operator = op;
    },
    aribicToRoman(romanNum) {
      if (!+romanNum) {
        return false;
      }

      let result = "";
      let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      let roman = [
        "M",
        "CM",
        "D",
        "CD",
        "C",
        "XC",
        "L",
        "XL",
        "X",
        "IX",
        "V",
        "IV",
        "I"
      ];
      for (let i = 0; i <= decimal.length; i++) {
        while (romanNum % decimal[i] < romanNum) {
          result += roman[i];
          romanNum -= decimal[i];
        }
      }
      return result;
    },
    romanToArabic(romanNumber) {
      romanNumber = romanNumber.toUpperCase();
      const romanNumb = [
        "CM",
        "M",
        "CD",
        "D",
        "XC",
        "C",
        "XL",
        "L",
        "IX",
        "X",
        "IV",
        "V",
        "I"
      ];
      const arabicNumbs = [
        900,
        1000,
        400,
        500,
        90,
        100,
        40,
        50,
        9,
        10,
        4,
        5,
        1
      ];
      let index = 0,
        num = 0;
      for (let rn in romanNumb) {
        index = romanNumber.indexOf(romanNumb[rn]);
        while (index !== -1) {
          num += parseInt(arabicNumbs[rn]);
          romanNumber = romanNumber.replace(romanNumb[rn], "-");
          index = romanNumber.indexOf(romanNumb[rn]);
        }
      }
      return num;
    },
    async calulate() {
      let convertedValueOne = await this.romanToArabic(this.firstInput);
      let convertedValueTwo = await this.romanToArabic(this.secondInput);
      if (this.operator === "-") {
        this.totalArabic = convertedValueOne - convertedValueTwo;
      }

      if (this.operator === "+") {
        this.totalArabic = convertedValueOne + convertedValueTwo;
      }

      if (this.operator === "*") {
        this.totalArabic = convertedValueOne * convertedValueTwo;
      }

      this.value = await this.totalArabic;
      if (this.value > 3999) {
        this.error = true;
        this.results = "FAIL";
      } else if (this.value < 0) {
        this.minusError = true;
        this.results = "FAIL";
      } else {
        let result = await this.aribicToRoman(this.totalArabic);
        this.results = result;
      }
    },

    clear() {
      this.firstInput = "";
      this.secondInput = "";
      this.results = "";
      this.totalArabic = "";
      this.operator = "";
      this.error = "";
      this.minusError = "";
    }
  }
};
</script>

<style lang="scss">
@import "./src/styles/Calculator.scss";
</style>
