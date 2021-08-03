var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')

var schema = buildSchema(`
  type Question {
    id: ID!
    question: String
    answer: Boolean
    trivia: String
  }
  type Score {
    id: ID!
    name: String
    score: Int
  }
  type Query {
    question(id: ID!): Question
    questions: [Question]
    scores: [Score]
  }
  type Mutation{
    createScore(name: String!, score: Int!): Score!
  }
`);

var scores = [];
var questions = [
  {
    id: '1',
    question: 'Der Mount Everest ist der höchste Berg der Welt',
    answer: true,
    trivia: 'Der Mount Everest ist ein Berg im Himalaya und mit einer Höhe von über 8848 m der höchste Berg der Erde.'
  },
  {
    id: '2',
    question: 'Die Japanischen Kanji wurden aus dem Chinesichen übernommen',
    answer: true,
    trivia: 'Kanji sind die in der japanischen Schrifttradition verwendeten Schriftzeichen chinesischen Ursprungs.'
  },
  {
    id: '3',
    question: 'Tim Cook ist ein Gründer von Apple',
    answer: false,
    trivia: 'Apple wurde 1976 von Steve Wozniak, Steve Jobs und Ron Wayne als Garagenfirma gegründet.'
  },
  {
    id: '4',
    question: 'Bhutan hat die prozentual höchste Umsatzsteuer der Welt',
    answer: true,
    trivia: 'Bhutan hat mit 50% die prozentual höchste Umsatzsteuer der Welt.'
  },
  {
    id: '5',
    question: '"How to sell drugs online (fast)" ist der Name einer Netflix-Serie',
    answer: true,
    trivia: 'How to Sell Drugs Online (Fast) ist eine deutschsprachige Coming-of-Age-Comedyserie. Es ist die dritte Serie von Netflix, die in Deutschland entwickelt, produziert und gefilmt wurde.'
  },
  {
    id: '6',
    question: 'Die Nintendo Wii ist die meist verkaufte Spielekonsole',
    answer: false,
    trivia: 'Die PlayStation 2 ist mit über 155 Millionen Einheiten die am meisten verkaufte Spielekonsole.'
  }
];

var root = {
  //Returns question with specific key
  question: ({id}) => {
    return questions.find(question => question.id === id);
  },
  //Returns all questions
  questions: () => {
    return questions;
  },
  //Returns scores
  scores: () => {
    return scores;
  },
  //Add a score
  createScore: ({name,score}) => {
    const id = require('crypto').randomBytes(10).toString('hex');
    const newScore = {id, name, score};
    scores.push(newScore);
    return newScore;
  }
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
