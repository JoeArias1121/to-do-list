import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <nav>
          <h1>This is your to-do-list</h1>
          <Link className='login-button' href='/login'>
            <button>Login</button>
          </Link>
          <Link href='/tasks'>
            <button>Tasks</button>
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <h1>
          This is the home page
        </h1>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
