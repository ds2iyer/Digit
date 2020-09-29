import React, { Component } from "react";
import { graphql } from "gatsby";
import "./main.css";

class App extends Component {
  state = {
    result: ``,
  };

  OD(IDV, City, Vehicle_cc, Vehicle_age) {
    let ODprem;
    const listOfCities = [
      "Ahmedabad",
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Kolkata",
      "Mumbai",
      "New Delhi",
      "Pune",
    ];
    if (listOfCities.includes(City)) {
      if (Vehicle_age <= 5) {
        if (Vehicle_cc <= 150) {
          ODprem = 0.01708 * IDV;
        } else if (150 < Vehicle_cc && Vehicle_cc <= 350) {
          ODprem = 0.01793 * IDV;
        } else if (Vehicle_age > 350) {
          ODprem = 0.01879 * IDV;
        }
      } else if (5 < Vehicle_age && Vehicle_age <= 10) {
        if (Vehicle_cc <= 150) {
          ODprem = 0.01793 * IDV;
        } else if (150 < Vehicle_age && Vehicle_age <= 350) {
          ODprem = 0.01883 * IDV;
        } else if (Vehicle_age > 350) {
          ODprem = 0.01973 * IDV;
        }
      } else if (Vehicle_age > 10) {
        if (Vehicle_cc <= 150) {
          ODprem = 0.01836 * IDV;
        } else if (150 < Vehicle_cc && Vehicle_cc <= 350) {
          ODprem = 0.01928 * IDV;
        } else if (Vehicle_cc > 350) {
          ODprem = 0.0202 * IDV;
        }
      }
    } else {
      if (Vehicle_age <= 5) {
        if (Vehicle_cc <= 150) {
          ODprem = 0.01676 * IDV;
        } else if (150 < Vehicle_cc && Vehicle_cc <= 350) {
          ODprem = 0.0176 * IDV;
        } else if (Vehicle_age > 350) {
          ODprem = 0.01844 * IDV;
        }
      } else if (5 < Vehicle_age && Vehicle_age <= 10) {
        if (Vehicle_cc <= 150) {
          ODprem = 0.0176 * IDV;
        } else if (150 < Vehicle_age && Vehicle_age <= 350) {
          ODprem = 0.01848 * IDV;
        } else if (Vehicle_age > 350) {
          ODprem = 0.01936 * IDV;
        }
      } else if (Vehicle_age > 10) {
        if (Vehicle_cc <= 150) {
          ODprem = 0.01802 * IDV;
        } else if (150 < Vehicle_cc && Vehicle_cc <= 350) {
          ODprem = 0.01892 * IDV;
        } else if (Vehicle_cc > 350) {
          ODprem = 0.01982 * IDV;
        }
      }
    }
    return ODprem;
  }

  final_OD(IDV, City, Vehicle_cc, Vehicle_age, Discount_rate, NCB) {
    let a = this.OD(IDV, City, Vehicle_cc, Vehicle_age);
    let OD_amt = a - (a * Discount_rate) - (a * NCB);
    return OD_amt;
  }


  addon(IDV, Addon_rate) {
    let addon_val = IDV * Addon_rate;
    return addon_val;
  }

  TP(Vehicle_cc, Vehicle_age) {
    let Tp_amt;
    if (Vehicle_age === 0) {
      if (Vehicle_cc <= 75) {
        Tp_amt = 1045;
      } else if (75 < Vehicle_cc && Vehicle_cc <= 150) {
        Tp_amt = 3285;
      } else if (150 < Vehicle_cc && Vehicle_cc <= 350) {
        Tp_amt = 5453;
      } else if (Vehicle_cc > 350) {
        Tp_amt = 13034;
      }
    } else if (Vehicle_age >= 1) {
      if (Vehicle_cc <= 75) {
        Tp_amt = 482;
      } else if (75 < Vehicle_cc && Vehicle_cc <= 150) {
        Tp_amt = 752;
      } else if (150 < Vehicle_cc && Vehicle_cc <= 350) {
        Tp_amt = 1193;
      } else if (Vehicle_cc > 350) {
        Tp_amt = 2323;
      }
    }
    return Tp_amt;
  }

  packagePremium(
    IDV,
    City,
    Vehicle_cc,
    Vehicle_age,
    Addon_rate,
    Discount_rate,
    NCB
  ) {
    let c = this.final_OD(IDV, City, Vehicle_cc, Vehicle_age, Discount_rate, NCB);
    let d = this.addon(IDV, Addon_rate);
    let e = this.TP(Vehicle_cc, Vehicle_age);
    return c + d + e;
  }

  finalPremium(
    IDV,
    City,
    Vehicle_cc,
    Vehicle_age,
    Addon_rate,
    Discount_rate,
    GST,
    NCB
  ) {
    let f = this.packagePremium(
      IDV,
      City,
      Vehicle_cc,
      Vehicle_age,
      Addon_rate,
      Discount_rate,
      NCB
    );
    return f + f * GST;
  }

  handleClick(
    number,
    IDV,
    City,
    Vehicle_cc,
    Vehicle_age,
    Addon_rate,
    Discount_rate,
    GST,
    NCB
  ) {
    number = parseInt(number);
    if (number <= 4) {
      if (number === 1) {
        this.setState({
          result: `1 year OD + 5 year TP = ${this.finalPremium(
            IDV,
            City,
            Vehicle_cc,
            Vehicle_age,
            Addon_rate,
            Discount_rate,
            GST,
            NCB
          )}`,
        });
      } else if (number === 2) {
        this.setState({
          result: `1 year OD + 1 year TP = ${this.finalPremium(
            IDV,
            City,
            Vehicle_cc,
            Vehicle_age,
            Addon_rate,
            Discount_rate,
            GST,
            NCB
          )}`,
        });
      } else if (number === 3) {
        let k = this.final_OD(IDV, City, Vehicle_cc, Vehicle_age, Discount_rate, NCB);
        console.log(k);
        let l = this.addon(IDV, Addon_rate);
        console.log(l);
        let n = k + l + (k + l) * GST;
        console.log(n);
        this.setState({ result: `SAOD = ${n}` });
      } else if (number === 4) {
        let o = this.TP(Vehicle_cc, Vehicle_age);
        let p = o + o * GST;
        this.setState({ result: `SATP = ${p}` });
      }
    } else {
      return `Invalid Input`;
    }
  }

  render() {
    const {
      Addon_rate,
      City,
      Discount_rate,
      GST,
      IDV,
      Vehicle_cc,
      Vehicle_age,
      NCB,
    } = this.props.data.allDataXlsxSheet1.edges[0].node;
    return (
      <div className="layout">
        <div className="container">
          <button type="button" value={1} onClick={(e) => this.handleClick(e.target.value,IDV,
    City,
    Vehicle_cc,
    Vehicle_age,
    Addon_rate,
    Discount_rate,
    GST,
    NCB )}>1 year OD + 5 year TP</button>
    <button type="button" value={2} onClick={(e) => this.handleClick(e.target.value,IDV,
    City,
    Vehicle_cc,
    Vehicle_age,
    Addon_rate,
    Discount_rate,
    GST,
    NCB )}>1 year OD + 1 year TP</button>
    <button type="button" value={3} onClick={(e) => this.handleClick(e.target.value,IDV,
    City,
    Vehicle_cc,
    Vehicle_age,
    Addon_rate,
    Discount_rate,
    GST,
    NCB )}>SAOD</button>
    <button type="button" value={4} onClick={(e) => this.handleClick(e.target.value,IDV,
    City,
    Vehicle_cc,
    Vehicle_age,
    Addon_rate,
    Discount_rate,
    GST,
    NCB )}>SATP</button>
        
        </div>
        <div className="result">Result:{this.state.result}</div>
      </div>
    );
  }
}
export default App;

export const DataQuery = graphql`
  query MyQuery {
    allDataXlsxSheet1 {
      edges {
        node {
          Addon_rate
          City
          Discount_rate
          GST
          IDV
          Vehicle_cc
          Vehicle_age
          NCB
        }
      }
    }
  }
`;
