import { Question, Difficulty } from "../model/question.model.js";
import QuestionRepository from "../repository/question.repository.js";

class QuestionService {
    /**
     * Method to register a new question in the database
     * @return Created question with generated ID
     * @error Throws an error if there is an issue creating the question
     */
    public async registerQuestion(
        level: Difficulty,
        statement: string,
        alternativeA: string,
        alternativeB: string,
        alternativeC: string,
        alternativeD: string,
        correctAnswer: string
    ): Promise<{ question: Question }> {
        try {
            if (!level || level.trim() === '') {
                throw new Error("Question level is required");
            }

            if (!statement || statement.trim() === '') {
                throw new Error("Statement is required");
            }

            const options = [alternativeA, alternativeB, alternativeC, alternativeD];
            if (options.some(option => !option || option.trim() === '')) {
                throw new Error("All four alternatives are required");
            }

            if (!correctAnswer || !['a', 'b', 'c', 'd'].includes(correctAnswer.toLowerCase())) {
                throw new Error("Correct answer must be one of 'a', 'b', 'c', 'd'");
            }

            const question = new Question(
                0,
                level,
                statement.trim(),
                alternativeA.trim(),
                alternativeB.trim(),
                alternativeC.trim(),
                alternativeD.trim(),
                correctAnswer.trim().toLowerCase()
            );

            const id = (await QuestionRepository.registerQuestion(
                question.getLevel(),
                question.getStatement(),
                question.getAlternativeA(),
                question.getAlternativeB(),
                question.getAlternativeC(),
                question.getAlternativeD(),
                question.getAnswer()
            )).id;
            question.setId(id);

            return { question: question };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to get 10 random questions from the database, 4 easy, 4 medium, and 2 hard
     * @returns Array of questions
     * @error Throws an error if there is an issue retrieving questions
     */
    public async getRandomQuestions(): Promise<{ questions: Question[] }> {
        try {
            const result = await QuestionRepository.getRandomQuestions();
            
            if (!result.questions || result.questions.length === 0) {
                throw new Error("No questions found");
            }

            const questions = result.questions.map(q => new Question(
                q.id,
                q.questionLevel,
                q.statement,
                q.alternativeA,
                q.alternativeB,
                q.alternativeC,
                q.alternativeD,
                q.correctAnswer
            ));

            return { questions: questions };
        
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to clear all questions from the database (for testing purposes)
     * @returns Status of the operation
     * @error Throws an error if there is an issue clearing questions
     */
    public async clearQuestions(): Promise<{ status: boolean }> {
        try {
            const result = await QuestionRepository.clearQuestions();
            if (!result.status) {
                throw new Error("Failed to clear questions");
            }

            return { status: true };
        } catch (error) {
            throw error;
        }
    }


    /**
     * Method to set up 30 initial questions
     * @returns status of the operation
     * @error Throws an error if there is an issue setting up the questions
     */
    public async setupInitialQuestions(): Promise<{ status: boolean }> {
        try {
            const questions:{
                level: Difficulty,
                statement: string,
                alternativeA: string,
                alternativeB: string,
                alternativeC: string,
                alternativeD: string,
                correctAnswer: string
            }[] = [
                {
                    level: Difficulty.EASY,
                    statement: "Qual é o nome da liga principal de League of Legends no Brasil?",
                    alternativeA: "LCS",
                    alternativeB: "LEC",
                    alternativeC: "LTA sul",
                    alternativeD: "LCK",
                    correctAnswer: "c"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Qual é a desenvolvedora responsável pelo League of Legends?",
                    alternativeA: "Valve",
                    alternativeB: "Riot Games",
                    alternativeC: "Blizzard",
                    alternativeD: "Ubisoft",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Qual time brasileiro é conhecido como o 'Maior do CBLOL' pelo número de títulos?",
                    alternativeA: "INTZ",
                    alternativeB: "paiN Gaming",
                    alternativeC: "LOUD",
                    alternativeD: "Kabum!",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Qual jogador brasileiro é famoso pelo apelido 'brTT'?",
                    alternativeA: "esA",
                    alternativeB: "brTT",
                    alternativeC: "Matsukaze",
                    alternativeD: "Tockers",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Em que ano ocorreu a primeira edição oficial do CBLOL?",
                    alternativeA: "2010",
                    alternativeB: "2012",
                    alternativeC: "2014",
                    alternativeD: "2016",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Qual time brasileiro representou o Brasil no Worlds 2021?",
                    alternativeA: "Flamengo",
                    alternativeB: "paiN Gaming",
                    alternativeC: "INTZ",
                    alternativeD: "LOUD",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Qual dessas equipes já foi campeã do CBLOL?",
                    alternativeA: "Kabum!",
                    alternativeB: "Vivo Keyd",
                    alternativeC: "Rensga",
                    alternativeD: "Liberty",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Quem é considerado o 'Rei do CBLOL'?",
                    alternativeA: "brTT",
                    alternativeB: "Tinowns",
                    alternativeC: "Revolta",
                    alternativeD: "Yoda",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Qual dessas equipes entrou no CBLOL com o sistema de franquias em 2021?",
                    alternativeA: "LOUD",
                    alternativeB: "paiN Gaming",
                    alternativeC: "INTZ",
                    alternativeD: "Kabum!",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.EASY,
                    statement: "Qual jogador brasileiro ficou conhecido pelo bordão 'Fala Zezinho'?",
                    alternativeA: "Yoda",
                    alternativeB: "Kami",
                    alternativeC: "Tinowns",
                    alternativeD: "micaO",
                    correctAnswer: "a"
                },

                {
                    level: Difficulty.MEDIUM,
                    statement: "Qual foi o primeiro time brasileiro a participar de um Mundial de League of Legends?",
                    alternativeA: "paiN Gaming",
                    alternativeB: "INTZ",
                    alternativeC: "Kabum!",
                    alternativeD: "LOUD",
                    correctAnswer: "c"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Em qual edição do Mundial a Kabum! representou o Brasil pela primeira vez?",
                    alternativeA: "2013",
                    alternativeB: "2014",
                    alternativeC: "2015",
                    alternativeD: "2016",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Qual organização contratou o jogador 'Kami' para ser ícone de sua equipe?",
                    alternativeA: "LOUD",
                    alternativeB: "paiN Gaming",
                    alternativeC: "INTZ",
                    alternativeD: "Kabum!",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Qual jogador brasileiro ficou famoso por jogar de Zilean no CBLOL?",
                    alternativeA: "Revolta",
                    alternativeB: "Tinowns",
                    alternativeC: "Kami",
                    alternativeD: "Tockers",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Qual foi a primeira equipe a conquistar 4 títulos do CBLOL?",
                    alternativeA: "Kabum!",
                    alternativeB: "paiN Gaming",
                    alternativeC: "INTZ",
                    alternativeD: "LOUD",
                    correctAnswer: "c"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Quem foi o caçador da INTZ na famosa vitória contra a EDG no Worlds 2016?",
                    alternativeA: "Revolta",
                    alternativeB: "Shini",
                    alternativeC: "Croc",
                    alternativeD: "Yampi",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Qual dessas equipes foi vice-campeã do CBLOL 2021?",
                    alternativeA: "paiN Gaming",
                    alternativeB: "Rensga",
                    alternativeC: "Kabum!",
                    alternativeD: "LOUD",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Em qual ano a LOUD conquistou seu primeiro título de CBLOL?",
                    alternativeA: "2021",
                    alternativeB: "2022",
                    alternativeC: "2023",
                    alternativeD: "2020",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Quem foi o suporte da paiN Gaming no título de 2013?",
                    alternativeA: "esA",
                    alternativeB: "Loop",
                    alternativeC: "RedBert",
                    alternativeD: "Jockster",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.MEDIUM,
                    statement: "Qual dessas equipes brasileiras já enfrentou a T1 em um torneio internacional?",
                    alternativeA: "Kabum!",
                    alternativeB: "paiN Gaming",
                    alternativeC: "INTZ",
                    alternativeD: "LOUD",
                    correctAnswer: "d"
                },

                {
                    level: Difficulty.HARD,
                    statement: "Qual foi a line-up campeã da INTZ no CBLOL 2016?",
                    alternativeA: "Yang, Revolta, Tockers, micaO, Jockster",
                    alternativeB: "Ayel, Shini, Envy, Abaxial, RedBert",
                    alternativeC: "Lep, Turtle, Kami, brTT, esA",
                    alternativeD: "Robo, Cariok, Tinowns, Brance, Ceos",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Quantos títulos de CBLOL a paiN Gaming possui até 2023?",
                    alternativeA: "3",
                    alternativeB: "4",
                    alternativeC: "2",
                    alternativeD: "5",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Qual foi o mid laner da Kabum! no Mundial de 2014?",
                    alternativeA: "Tinowns",
                    alternativeB: "Kami",
                    alternativeC: "Tockers",
                    alternativeD: "dyNquedo",
                    correctAnswer: "c"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Qual time eliminou a paiN Gaming no Mundial de 2015?",
                    alternativeA: "Flash Wolves",
                    alternativeB: "CLG",
                    alternativeC: "KOO Tigers",
                    alternativeD: "Todos os anteriores",
                    correctAnswer: "d"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Qual foi o suporte campeão com a Kabum! no CBLOL 2014?",
                    alternativeA: "esA",
                    alternativeB: "danagorn",
                    alternativeC: "Loop",
                    alternativeD: "Daniels",
                    correctAnswer: "d"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Qual foi o resultado da INTZ contra a EDG no Worlds 2016?",
                    alternativeA: "Vitória da INTZ",
                    alternativeB: "Derrota da INTZ",
                    alternativeC: "Empate",
                    alternativeD: "Jogo não aconteceu",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Qual jogador brasileiro foi contratado pela Team oNe em 2017 para o CBLOL?",
                    alternativeA: "Absolut",
                    alternativeB: "4LaN",
                    alternativeC: "Marf",
                    alternativeD: "BrTT",
                    correctAnswer: "b"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Quem foi o MVP do CBLOL 2020?",
                    alternativeA: "Tinowns",
                    alternativeB: "Robo",
                    alternativeC: "brTT",
                    alternativeD: "DyNquedo",
                    correctAnswer: "a"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Qual dessas organizações NUNCA venceu um título de CBLOL até 2023?",
                    alternativeA: "Kabum!",
                    alternativeB: "paiN Gaming",
                    alternativeC: "LOUD",
                    alternativeD: "Rensga",
                    correctAnswer: "d"
                },
                {
                    level: Difficulty.HARD,
                    statement: "Qual jogador atuou tanto pela INTZ quanto pela paiN Gaming?",
                    alternativeA: "micaO",
                    alternativeB: "Revolta",
                    alternativeC: "Tinowns",
                    alternativeD: "Kami",
                    correctAnswer: "b"
                }
            ];

            for (const q of questions) {
                const question = await this.registerQuestion(
                    q.level,
                    q.statement,
                    q.alternativeA,
                    q.alternativeB,
                    q.alternativeC,
                    q.alternativeD,
                    q.correctAnswer
                );
            }

            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}


export default new QuestionService();