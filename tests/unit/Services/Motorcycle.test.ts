import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import MotorService from '../../../src/Services/MotorService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import { listMotor, newMotor, updatedMotor } from './Mocks/MotorMock';

describe('Testando as funcionalidade de MotorService', function () {
  it('Deve cadastrar uma nova moto', async function () {
    // Arrange
    const response: Motorcycle = new Motorcycle(
      { id: '634852326b35b59438fbea2f', ...newMotor },
    );

    Sinon.stub(Model, 'create').resolves(response);

    // Action
    const service = new MotorService();
    const result = await service.create(newMotor);

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deve listar todas as motos', async function () {
    // Arrange
    Sinon.stub(Model, 'find').resolves(listMotor);

    // Action
    const service = new MotorService();
    const result = await service.find();

    // Assert
    expect(result).to.be.deep.equal(listMotor);
  });

  it('Deve buscar uma moto pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(listMotor[0]);

    // Action
    const service = new MotorService();
    const result = await service.findById('634852326b35b59438fbea2f');
        
    // Assert
    expect(result).to.be.deep.equal(listMotor[0]);
  });

  it('Deve atualizar uma moto pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMotor);

    // Action
    const service = new MotorService();
    const result = await service.update('634852326b35b59438fbea2f', newMotor);
        
    // Assert
    expect(result).to.be.deep.equal(updatedMotor);
  });

  afterEach(function () {
    Sinon.restore();
  });
});