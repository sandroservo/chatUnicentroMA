import mongoose from 'mongoose';

export async function connect(){
    try {
      await mongoose.connect('mongodb+srv://sandroservo:aSDHJJsi1a0jzYAf@cluster0.0czibaq.mongodb.net/chat-unicentroma');
      
    } catch (error) {
        console.log('erro ao conectar no  banco de dados.', error)
    }
}