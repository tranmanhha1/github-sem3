const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 3000;

mongoose.connect('mongodb://localhost:27017/music');

const MusicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    size: { type: Number, required: true },
    views: { type: Number, default: 0 },
});

const Music = mongoose.model('Music', MusicSchema);
app.use(bodyParser.json());

app.get('/api/musics', async (req, res)=> {
    try {
        const musics = await Music.find()
        res.json(musics);
    } catch(error){
        res.status(500).json({error: error.message});
    }
});

app.get('/api/musics/:id', async (req, res)=> {
    try {
      const music = await Music.findById(req.params.id);
      if(!music){
        return res.status(404).json({error: 'Not Found'})
      }
      res.json(music);
    } catch(error){
      res.status(500).json({error: error.message});
    }
});

app.post('/api/musics', async (req, res) => {
    const {name, author, size, views} = req.body;
  try {
    const newMusic= new Music({name, author, size, views});
    const savedMucsic = await newMusic.save();
     res.json(savedMucsic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/musics/:id', async (req, res) => {
    const {name, author, size, views} = req.body;
  try {
    const updateMusic = await Music.findByIdAndUpdate(
    req.params.id,
    {name, author, size, views},
    { new: true }
    );
    if (!updateMusic) {
        return res.status(404).json({ error: 'Not Found' });
    }
    res.json(updateMusic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/musics/:id', async (req, res) => {
    try {
      const deleteMusic = await Music.findByIdAndDelete(req.params.id);
      if (!deleteMusic) {
          return res.status(404).json({ error: 'Not Found' });
       
      }
  
      res.json(deleteMusic);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });