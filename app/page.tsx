import Image from "next/image";
import { Text, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Card>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </main>
  );
}
