<template>
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>
          <button class="sort-button">Status</button>
        </th>
        <th>
          <button class="sort-button sort-button--ascending">Date</button>
        </th>
        <th>
          <button class="sort-button">Amount</button>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <img src="../assets/images/send.svg" alt="send">
        </td>
        <td>
          <p class="status status--pending">Pending</p>
        </td>
        <td>1 minute ago</td>
        <td>
          <p class="amount-expense">-0.00136643 <span class="amount-currency">BTC</span></p>
          <p class="amount">-$14,11 <span class="amount-currency">USD</span></p>
        </td>
        <td>
          <a href="https://www.blockchain.com/uk/btc/blocks" class="external-link">
            <img src="../assets/images/external-link.svg"/>
          </a>
        </td>
      </tr>
      <tr>
        <td>
          <img src="../assets/images/send.svg" alt="send">
        </td>
        <td>
          <p class="status status--unconfirmed">Unconfirmed</p>
        </td>
        <td>10 minutes ago</td>
        <td>
          <p class="amount-expense">-0.00136643 <span class="amount-currency">BTC</span></p>
          <p class="amount">-$14,11 <span class="amount-currency">USD</span></p>
        </td>
        <td>
          <a href="https://www.blockchain.com/uk/btc/blocks" class="external-link">
            <img src="../assets/images/external-link.svg"/>
          </a>
        </td>
      </tr>
      <tr>
        <td>
          <img src="../assets/images/receive.svg" alt="receive">
        </td>
        <td>
          <p class="status status--complete">Complete</p>
        </td>
        <td>
          1 Sep,2020
          <p class="transaction-time">9:53 AM</p>
        </td>
        <td>
          <p class="amount-income">-0.00136643 <span class="amount-currency">BTC</span></p>
          <p class="amount">-$14,11 <span class="amount-currency">USD</span></p>
        </td>
        <td>
          <a href="https://www.blockchain.com/uk/btc/blocks" class="external-link">
            <img src="../assets/images/external-link.svg"/>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
}
</script>

<style scoped>
  .table {
    width: 100%;
    border-collapse: separate; 
    border-spacing: 0 2px;
  }
  .sort-button {
    position: relative;
    padding: 0;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    text-transform: uppercase;
    color: #7E858F;
    border: none;
    background: none;
  }
  .sort-button--ascending,
  .sort-button--descending {
    padding-right: 20px;
  }
  .sort-button--ascending::after,
  .sort-button--descending::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 8px;
    height: 8px;
    transform: translateY(-50%);
    background: url('../assets/images/caret-up.svg') center no-repeat;
  }
  .sort-button--descending::after {
    transform: translateY(-50%) rotate(180deg);
  }
  .table th {
    text-align: left;
    padding-left: 16px;
    padding-right: 20px;
  }
  .table th:nth-child(4) {
    text-align: right;
  }
  .table td {
    padding: 10px 20px 11px 16px;
    font-size: 14px;
    line-height: 20px;
    color: #DCE0E7;
    vertical-align: middle;
    background: #090C14;
    border: none;
  }
  .table tbody tr:first-child td:first-child {
    border-top-left-radius: 3px;
  }
  .table tbody tr:last-child td:first-child {
    border-bottom-left-radius: 3px;
  }
  .table tbody tr:first-child td:last-child {
    border-top-right-radius: 3px;
  }
  .table tbody tr:last-child td:last-child {
    border-bottom-right-radius: 3px;
  }
  .status {
    position: relative;
    padding-left: 16px;
  }
  .status::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .status--pending::before {
    background: #F7931A;
  }
  .status--unconfirmed::before {
    background: #B34444;
  }
  .status--complete::before {
    background: #528C5B;
  }
  .transaction-time {
    font-size: 11px;
    line-height: 18px;
    color: #7E858F;
  }
  .amount-expense {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #B24444;
  }
  .amount-income {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #528C5B;
  }
  .amount {
    font-size: 11px;
    line-height: 18px;
    text-align: right;
    color: #ACB2BB;
  }
  .amount-currency {
    font-weight: normal;
    font-size: 11px;
    line-height: 18px;
    color: #7E858F;
  }
  .external-link {
    margin-left: auto;
    display: block;
    width: 16px;
  }
</style>
