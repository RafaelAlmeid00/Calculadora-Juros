import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "./style";

const App = () => {
  const [capital, setCapital] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [days, setDays] = useState('');
  const [interestRate, setInterestRate] = useState(13.64);
  const [taxTable, setTaxTable] = useState([
    { maxDays: 182, taxRate: 22.5 },
    { maxDays: 365, taxRate: 20 },
    { maxDays: 730, taxRate: 17.5 },
    { maxDays: Infinity, taxRate: 15 },
  ]);

  const calculateProfit = () => {
    try {
      const cdiRate = interestRate / 100;
      let yearsNumber = parseInt(years);
      let monthsNumber = parseInt(months);
      let daysNumber = parseInt(days);

      if (isNaN(capital) || capital <= 0) {
        const erroralertcap = `
Capital Inicial deve ser maior que zero.`;

          throw new Error(erroralertcap);
      } else if (yearsNumber || monthsNumber || daysNumber) {
        yearsNumber = yearsNumber || 0;
        monthsNumber = monthsNumber || 0;
        daysNumber = daysNumber || 0;
      } else {
        const erroralertday = `
Informe a quantidade de anos, meses e/ou dias.`;
    
          throw new Error(erroralertday);
      }

      const totalDays = yearsNumber * 365 + monthsNumber * 30 + daysNumber;
      const capitalNumber = parseFloat(capital.replace(',', '.'));

      const taxRate = taxTable.find(tax => totalDays <= tax.maxDays).taxRate;
      const afterTaxRate = 1 - (taxRate / 100);

      const profit = capitalNumber * (Math.pow(1 + (cdiRate * afterTaxRate / 12), totalDays / 30) - 1);
      const compoundProfit = capitalNumber * Math.pow(1 + (cdiRate * afterTaxRate / 12), totalDays / 30);

      const formattedProfit = profit.toFixed(2).replace('.', ',');
      const formattedCompoundProfit = compoundProfit.toFixed(2).replace('.', ',');
      const formattedCapital = capitalNumber.toFixed(2).replace('.', ',');
      const resultText = `Rendimento: R$ ${formattedProfit}\n
        Rendimento com juros compostos: R$ ${formattedCompoundProfit}\n
        Taxa CDI: ${interestRate}%\n
        Alíquota do IR: ${taxRate}%\n
        Capital inicial: R$ ${formattedCapital}`;

      alert(resultText);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Calculadora de Rendimentos</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          placeholder="Capital inicial (R$)"
          keyboardType="numeric"
          value={capital}
          onChangeText={setCapital}
        />
        </View>
        <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Anos"
    keyboardType="numeric"
    value={years}
    onChangeText={setYears}
  />
  <TextInput
    style={styles.input}
    placeholder="Meses"
    keyboardType="numeric"
    value={months}
    onChangeText={setMonths}
  />
  <TextInput
    style={styles.input}
    placeholder="Dias"
    keyboardType="numeric"
    value={days}
    onChangeText={setDays}
  />
</View>
      <TouchableOpacity onPress={calculateProfit} style={styles.button}>
        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>Calcular</Text>
      </TouchableOpacity>
      <View style={styles.table}>
        <Text style={styles.tableHeader}>Tabela de alíquotas do IR</Text>
        {taxTable.map(tax => (
          <View key={tax.maxDays} style={styles.tableRow}>
            <Text styles={styles.tableData}>Até {tax.maxDays} dias:</Text>
            <Text styles={styles.tableData}>{tax.taxRate}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default App;
