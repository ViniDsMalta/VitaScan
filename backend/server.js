const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Triagem = require('./models/Triagens');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://stellular-cranachan-0dc9ba.netlify.app'
  ],
  credentials: true
}));

const MONGODB_URI = 'mongodb+srv://viniciusmalta2503_db_user:DHMPoUPk8BUPz7nJ@cluster0.4vltf4q.mongodb.net/?appName=Cluster0';



mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.log('Erro ao conectar MongoDB:', err));





app.get('/', (req, res) => {
  res.json({ message: 'Servidor está funcionando!' });
});

// Rota da triagem
app.post('/api/triagem', async (req, res) => {
  try {
    console.log('Recebendo respostas:', req.body);
    
    const novaTriagem = new Triagem({
      respostas: req.body.respostas
    });
    
    await novaTriagem.save();
    console.log('Respostas salvas no MongoDB');
    
    res.json({ 
      success: true, 
      message: 'Respostas salvas com sucesso!',
      id: novaTriagem._id 
    });
    
  } catch (error) {
    console.log('Erro ao salvar:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao salvar respostas' 
    });
  }
});

// Rota listar triagens
app.get('/api/triagens', async (req, res) => {
  try {
    const triagens = await Triagem.find().sort({ timestamp: -1 });
    res.json(triagens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar triagens' });
  }
});

const PORT = 3000;


app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
  
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não encontrado' 
      });
    }
    
    
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Senha incorreta' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Login realizado com sucesso!',
      user: { username: user.username, role: user.role }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erro no servidor' 
    });
  }
});

// criar usuario (rota só para caso de alguma merda)
app.post('/api/create-admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Usuário já existe' 
      });
    }
    
    const newUser = new User({
      username,
      password,
      role: 'admin'
    });
    
    await newUser.save();
    
    res.json({ 
      success: true, 
      message: 'Usuário admin criado com sucesso!' 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao criar usuário' 
    });
  }
});


app.put('/api/triagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { respostas } = req.body;
    
    const triagemAtualizada = await Triagem.findByIdAndUpdate(
      id,
      { respostas },
      { new: true }
    );
    
    if (!triagemAtualizada) {
      return res.status(404).json({ error: 'Triagem não encontrada' });
    }
    
    res.json(triagemAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar triagem' });
  }
});


app.delete('/api/triagens/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const triagemExcluida = await Triagem.findByIdAndDelete(id);
    
    if (!triagemExcluida) {
      return res.status(404).json({ error: 'Triagem não encontrada' });
    }
    
    res.json({ message: 'Triagem excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir triagem' });
  }
});


app.put('/api/triagens/:id/cor', async (req, res) => {
  try {
    const { id } = req.params;
    const { corPulseira } = req.body;
    
    const triagemAtualizada = await Triagem.findByIdAndUpdate(
      id,
      { corPulseira },
      { new: true }
    );
    
    if (!triagemAtualizada) {
      return res.status(404).json({ error: 'Triagem não encontrada' });
    }
    
    res.json(triagemAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cor da pulseira' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});