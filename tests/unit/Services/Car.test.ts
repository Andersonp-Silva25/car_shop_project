import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import { newCar, listCar } from './Mocks/CarMock';

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
});