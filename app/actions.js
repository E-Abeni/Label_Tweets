"use server"

import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'test-app',
    brokers: ['localhost:9092'],
  });

export async function handleProduce(data){    
      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
        topic: 'labeled_tweets',
        messages: [
          { value: JSON.stringify(data) },
        ],
      });
    
      console.log(data)

}


export async function handleConsume(){     

    const consumer = kafka.consumer({ groupId: 'another-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'labeled_tweets', fromBeginning: true })
    
    const msgs = []

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
          console.log({
              key: message.key.toString(),
              value: message.value.toString(),
              headers: message.headers,
          })
      },
  })

  console.log("==============")
  console.log(msgs)
  console.log("+++++++++++++++++++++")
   
}