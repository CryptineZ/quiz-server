var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')

var schema = buildSchema(`
  type Question {
    id: Int
    question: String
    answer: Boolean
    trivia: String
  }
  type Query {
    question(id: Int): Question
    questions: [Question]
  }
`);

var questions = [
  {
    question: 'Der Mount Everest ist der höchste Berg der Welt',
    answer: true,
    trivia: 'Der Mount Everest ist ein Berg im Himalaya und mit einer Höhe von über 8848 m der höchste Berg der Erde.'
  },
  {
    question: 'Die Japanischen Kanji wurden aus dem Chinesichen übernommen',
    answer: true,
    trivia: 'Kanji sind die in der japanischen Schrifttradition verwendeten Schriftzeichen chinesischen Ursprungs.'
  },
  {
    question: 'Tim Cook ist ein Gründer von Apple',
    answer: false,
    trivia: 'Apple wurde 1976 von Steve Wozniak, Steve Jobs und Ron Wayne als Garagenfirma gegründet.'
  },
  {
    question: 'Bhutan hat die prozentual höchste Umsatzsteuer der Welt',
    answer: true,
    trivia: 'Bhutan hat mit 50% die prozentual höchste Umsatzsteuer der Welt.'
  },
  {
    question: '"How to sell drugs online (fast)" ist der Name einer Netflix-Serie',
    answer: true,
    trivia: 'How to Sell Drugs Online (Fast) ist eine deutschsprachige Coming-of-Age-Comedyserie. Es ist die dritte Serie von Netflix, die in Deutschland entwickelt, produziert und gefilmt wurde.'
  },
  {
    question: 'Die Nintendo Wii ist die meist verkaufte Spielekonsole',
    answer: false,
    trivia: 'Die PlayStation 2 ist mit über 155 Millionen Einheiten die am meisten verkaufte Spielekonsole.'
  }
];

var root = {
  //Returns question with specific key
  question: ({id}) => {
    return questions[id];
  },
  //Returns all questions
  questions: () => {
    return questions;
  },
};

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
