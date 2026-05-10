import dayjs from "dayjs";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function HeroSection({
  userInfo,
  setUserInfo,
  currentUser,
  setCurrentUser,
}) {
  const amountInput = useRef();
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const amountDeposit = () => {
    const amount = +amountInput.current.value;

    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    const updatedUsers = userInfo.map((u) => {
      if (u.username === currentUser.username) {
        const newTransaction = {
          beforeBalance: u.balance,
          amount,
          type: "Deposit",
          afterBalance: u.balance + amount,
          dateTime: dayjs().format("MM/YY hh:mm a"),
        };

        return {
          ...u,
          balance: u.balance + amount,
          transactions: [newTransaction, ...u.transactions],
        };
      }
      return u;
    });

    const updatedCurrentUser = updatedUsers.find(
      (u) => u.username === currentUser.username,
    );

    setUserInfo(updatedUsers);
    setCurrentUser(updatedCurrentUser);

    toast.success("Deposited!");
    amountInput.current.value = "";
  };

  const amountWithdraw = () => {
    const amount = +amountInput.current.value;

    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    if (currentUser.balance < amount) {
      toast.error("Not enough balance");
      return;
    }

    const updatedUsers = userInfo.map((u) => {
      if (u.username === currentUser.username) {
        const newTransaction = {
          beforeBalance: u.balance,
          amount,
          type: "Withdraw",
          afterBalance: u.balance - amount,
          dateTime: dayjs().format("MM/YY hh:mm a"),
        };

        return {
          ...u,
          balance: u.balance - amount,
          transactions: [newTransaction, ...u.transactions],
        };
      }
      return u;
    });

    const updatedCurrentUser = updatedUsers.find(
      (u) => u.username === currentUser.username,
    );

    setUserInfo(updatedUsers);
    setCurrentUser(updatedCurrentUser);

    toast.success("Withdrawn!");
    amountInput.current.value = "";
  };

  const undoLastTransaction = () => {
    if (!currentUser.transactions.length) return;

    const updatedUsers = userInfo.map((u) => {
      if (u.username === currentUser.username) {
        const last = u.transactions[0];

        return {
          ...u,
          balance: last.beforeBalance,
          transactions: u.transactions.slice(1),
        };
      }
      return u;
    });

    const updatedCurrentUser = updatedUsers.find(
      (u) => u.username === currentUser.username,
    );

    setUserInfo(updatedUsers);
    setCurrentUser(updatedCurrentUser);
  };

  return (
    <section className="w-full h-[138dvh] md:h-[88dvh] py-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-5 items-center text-white">
        <div className="col-span-1 grid grid-rows-2 h-full gap-5">
          <div className="row-span-1 bg-white/15 backdrop-blur-md border flex flex-col items-center border-white/25 rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Welcome{" "}
              <span className="text-purple-600">{currentUser.name}</span>
              <br />
              Your <span className="text-purple-600">Balance</span>:{" "}
              {showBalance ? currentUser.balance : "****"}
            </h1>
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={toggleBalance}
            >
              {showBalance ? "Hide Balance" : "Show Balance"}
            </button>
          </div>
          <div className="row-span-1 bg-white/15 backdrop-blur-md border flex flex-col items-center border-white/25 gap-5 rounded-2xl shadow-2xl p-8">
            <input
              ref={amountInput}
              className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/25 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="number"
              placeholder="Enter your Amount"
            />
            <button
              onClick={amountDeposit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Deposit
            </button>
            <button
              onClick={amountWithdraw}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Withdraw
            </button>
          </div>
        </div>
        <div
          className={`col-span-1 lg:col-span-2 bg-white/15 h-[50dvh] md:h-full overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden backdrop-blur-md border flex items-start justify-center border-white/25 rounded-2xl shadow-2xl p-8`}
        >
          <table className="w-full text-white">
            <thead className="text-left hidden lg:table-header-group">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Before Balance</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">After Balance</th>
                <th className="px-4 py-2">Date / Time</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="block lg:table-row-group">
              {currentUser.transactions.length > 0 ? (
                currentUser.transactions.map((el, i) => {
                  return (
                    <tr
                      key={i}
                      className="border-t border-white/25 block lg:table-row"
                    >
                      <td className="px-4 py-2 flex justify-between lg:table-cell">
                        <span className="block lg:hidden">Transaction </span>
                        {i + 1}
                      </td>
                      <td className="px-4 py-2 flex justify-between lg:table-cell">
                        <span className="block lg:hidden">Before Balance</span>
                        {el.beforeBalance}
                      </td>
                      <td className="px-4 py-2 flex justify-between lg:table-cell">
                        <span className="block lg:hidden">Amount</span>
                        {el.amount}
                      </td>
                      <td
                        className={`px-4 py-2 flex justify-between lg:table-cell ${el.type === "Deposit" ? "text-green-500" : "text-red-500"}`}
                      >
                        <span className="block lg:hidden text-white">Type</span>
                        {el.type === "Deposit" ? "+" : "-"} {el.type}
                      </td>
                      <td className="px-4 py-2 flex justify-between lg:table-cell">
                        <span className="block lg:hidden">After Balance</span>
                        {el.afterBalance}
                      </td>
                      <td className="px-4 py-2 flex justify-between lg:table-cell">
                        <span className="block lg:hidden">Date / Time</span>
                        {el.dateTime}
                      </td>
                      <td className="px-4 py-2 flex justify-between lg:table-cell">
                        <span className="block lg:hidden">Action</span>

                        {i !== 0 ? (
                          <span className="text-gray-500">No action</span>
                        ) : (
                          <button
                            className="bg-purple-600 hover:bg-purple-700 text-white w-[50%] lg:w-full font-bold py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onClick={undoLastTransaction}
                          >
                            Undo
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-4 pt-40 text-center" colSpan="7">
                    No transaction history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
