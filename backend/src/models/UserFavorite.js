import mongoose from 'mongoose';

const userFavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    index: true
  },
  pokemonId: {
    type: Number,
    required: true
  },
  // Store only essential Pokémon data
  pokemonData: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    sprites: {
      front_default: String,
      other: {
        'official-artwork': {
          front_default: String
        }
      }
    },
    types: [{
      slot: Number,
      type: {
        name: String,
        url: String
      }
    }]
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  // Create a compound index to ensure a user can't favorite the same Pokémon twice
  indexes: [
    // Compound index for userId and pokemonId with uniqueness constraint
    {
      userId: 1,
      pokemonId: 1
    },
    // Alternative syntax for the same compound index
    {
      unique: true,
      fields: ['userId', 'pokemonId']
    },
    // Index for faster lookups by userId alone
    {
      userId: 1
    },
    // Index for faster lookups by pokemonId alone
    {
      pokemonId: 1
    },
    // Index for sorting by addedAt
    {
      addedAt: -1
    }
  ]
});

// Add a method to get user's favorites
userFavoriteSchema.statics.findByUserId = async function(userId) {
  return this.find({ userId });
};

// Add a method to check if a Pokémon is favorited by user
userFavoriteSchema.statics.isFavorited = async function(userId, pokemonId) {
  const count = await this.countDocuments({ userId, pokemonId });
  return count > 0;
};

// Add a method to toggle favorite status
userFavoriteSchema.statics.toggleFavorite = async function(userId, pokemonData) {
  const { id: pokemonId } = pokemonData;
  const existing = await this.findOne({ userId, pokemonId });
  
  if (existing) {
    await this.deleteOne({ _id: existing._id });
    return { isFavorited: false };
  } else {
    await this.create({
      userId,
      pokemonId,
      pokemonData
    });
    return { isFavorited: true };
  }
};

const UserFavorite = mongoose.models.UserFavorite || mongoose.model('UserFavorite', userFavoriteSchema);

export default UserFavorite;
