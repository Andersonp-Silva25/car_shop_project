import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import { newCar, listCar, updatedCar, deletedCar } from './Mocks/CarMock';

describe('Testando as funcionalidade de CarService', function () {
  it('Deve cadastrar um novo carro', async function () {
    // Arrange
    const response: Car = new Car(
      { id: '634852326b35b59438fbea2f', ...newCar },
    );

    Sinon.stub(Model, 'create').resolves(response);

    // Action
    const service = new CarService();
    const result = await service.create(newCar);

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deve listar todos os carros', async function () {
    // Arrange
    Sinon.stub(Model, 'find').resolves(listCar);

    // Action
    const service = new CarService();
    const result = await service.find();

    // Assert
    expect(result).to.be.deep.equal(listCar);
  });

  it('Deve buscar um carro pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(listCar[0]);

    // Action
    const service = new CarService();
    const result = await service.findById('634852326b35b59438fbea2f');
        
    // Assert
    expect(result).to.be.deep.equal(listCar[0]);
  });

  it('Não devera buscar carros se o mongoId for invalido', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(listCar[0]);

    try {
    // Action
      const service = new CarService();
      await service.findById('63');
    } catch (error) {    
    // Assert
      expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Não devera buscar carros que não existam', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(listCar[0]);

    try {
    // Action
      const service = new CarService();
      await service.findById('634852326b35b59438fbea56');
    } catch (error) {    
    // Assert
      expect((error as Error).message).to.be.deep.equal('Car not found');
    }
  });

  it('Deve atualizar um carro pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCar);

    // Action
    const service = new CarService();
    const result = await service.update('634852326b35b59438fbea2f', newCar);
        
    // Assert
    expect(result).to.be.deep.equal(updatedCar);
  });

  it('Deve excluir um carro pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndDelete').resolves(deletedCar);
    Sinon.stub(Model, 'find').resolves(deletedCar);

    // Action
    const service = new CarService();
    await service.delete('634852326b35b59438fbea2f');
    const result = await service.find();
        
    // Assert
    expect(result).to.be.deep.equal(deletedCar);
  });

  afterEach(function () {
    Sinon.restore();
  });
});