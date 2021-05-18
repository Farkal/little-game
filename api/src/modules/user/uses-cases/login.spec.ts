// import { Test } from '@nestjs/testing';
// import { JwtService } from '@nestjs/jwt';
// import { LoginUserInteractor} from './login'
// describe('loginInteractor', () => {
//   let loginInteractor = LoginUserInteractor;
//   let jwtService = JwtService;
//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [LoginUserInteractor],
//       providers: [JwtService]
//   }).compile()

//     loginInteractor = moduleRef.get<LoginUserInteractor>(LoginUserInteractor)
//     jwtService = moduleRef.get<JwtService>(JwtService)
//   })

//   it('should return token', async () => {
//     jest.spyOn(jwtService, 'sign').mockImplementation(() => "thisisyourtoken");
//     expect(await loginInteractor.login("toto", "titi")).toBe("thisisyourtoken")

//   })

// })
describe('loginInteractor', () => {
  it('should add tests', () => {
    expect(0).toBe(0)
  })
})
