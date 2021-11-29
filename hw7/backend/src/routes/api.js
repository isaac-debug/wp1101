import ScoreCard from "../models/ScoreCard";

const deleteDB = async () => {
    try {
      await ScoreCard.deleteMany({});
      console.log("Database deleted");
    } 
    catch (e) { throw new Error("Database deletion failed"); }
  };

const saveScoreCard = async (name, subject, score) => {
    const existing = await ScoreCard.findOne({ name, subject });
    if (existing) throw new Error(`data ${name} ${subject} exists!!`);
    try {
      const newCard = new ScoreCard({name, subject, score});
      console.log("Created user", newCard);
      return newCard.save();
    } catch (e) { throw new Error("User creation error: " + e); }
  };

const queryCard = async (queryType, queryString) => {
    if (queryType === 'name'){
        // query by name
        const queryResult = await ScoreCard.find({Name : queryString})
        return queryResult
    }
    else if (queryType === 'subject'){
        // query by subject
        const queryResult = await ScoreCard.find({Subject : queryString})
        return queryResult
    }
}

export {deleteDB ,saveScoreCard, queryCard}