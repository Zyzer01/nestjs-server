import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async getRecipe(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id: id } });
    if (!recipe) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return recipe;
  }

  async createRecipe(recipeDto: RecipeDto): Promise<void> {
    await this.recipeRepository.save(recipeDto);
  }

  async updateDescription(id: string, description: string): Promise<void> {
    await this.recipeRepository.update({ id }, { description });
  }

  async deleteRecipe(id: string): Promise<void> {
    await this.recipeRepository.delete({ id });
  }
}
