"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import { useState } from "react";

function MessageRow({ message }) {
  return (
    <tr>
      <td>{message[0]}</td>
      <td>{message[1]}</td>
      <td>{message[2]}</td>
    </tr>
  );
}

function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <form>
      <label>
        Procure uma mensagem:
      </label>
      <input type="text" value={filterText} placeholder="Pesquise..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function FilterableMessageTable({ messages, filterText}) {
  const rows = [];
  messages.forEach((message) => {
     if (messages[1].includes(filterText)) {
      return;
    }
    rows.push(
      <MessageRow
        message={message}
        key={message[1]} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}


export default function Home() {
  const [blogMessages, setBlogMessages] = useState([]);

  fetch(
    "https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec"
  )
    .then((response) => response.json())
    .then((data) => {
      setBlogMessages(data);
    });

    return (
      <main className={styles.main}>
         <SearchBar filterText={filterText}  inStockOnly={inStockOnly} 
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly}/>
        <FilterableMessageTable messages={blogMessages} filterText={filterText} />
      </main>
    );
}
