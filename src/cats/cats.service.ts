import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cat } from "./entities/cats.entity";
import { Repository } from "typeorm";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { CreateCatDto } from "./dto/create-cat.dto";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find({ relations: ["users"] });
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = createCatDto.name;
    cat.age = createCatDto.age;
    cat.breed = createCatDto.breed;
    return this.catsRepository.save(cat);
  }

  async updateById(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) {
      throw new HttpException("Cat not found", HttpStatus.BAD_REQUEST);
    }

    if (updateCatDto.name) {
      cat.name = updateCatDto.name;
    }

    if (updateCatDto.age) {
      cat.age = updateCatDto.age;
    }

    if (updateCatDto.breed) {
      cat.breed = updateCatDto.breed;
    }

    return this.catsRepository.save(cat);
  }

  async findById(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) throw new HttpException("Cat not found", HttpStatus.BAD_REQUEST);
    return cat;
  }

  async remove(id: number): Promise<void> {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) throw new HttpException("Cat not found", HttpStatus.BAD_REQUEST);
    await this.catsRepository.remove(cat);
  }
}
