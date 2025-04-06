export function makeGetUserController(getUserByIdUseCase) {
    return async function (req, res) {
      const { id } = req.params;
      const user = await getUserByIdUseCase.execute(id);
      if (user) return res.json(user);
      return res.status(404).json({ message: 'User not found' });
    };
  }
  