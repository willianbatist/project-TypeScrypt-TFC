export const userMock = { 
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

export const login = {
  email: 'user@user.com',
  password: 'secret_user'
}

export const loginPassword = {
  password: 'secret_user'
}

export const loginEmail = {
  email: 'user@user.com',
}

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY1NzY1MjQ5OH0.UMEAZNmlMqHmvLDTrMz8dfxm1WrFfl07vn_hs2EI0_c'


export const boardMock = [
  {
    name: "Bahia",
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 1,
    goalsBalance: 1,
    efficiency: 100
  },
  {
    name: "Avaí/Kindermann",
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 2,
    goalsBalance: -1,
    efficiency: 0
  }
]

export const matchMock = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Bahia"
    },
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Bahia"
    },
    teamAway: {
      teamName: "Avaí/Kindermann"
    },
  }
];

export const teamMock = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  }
]

export const teams = [{
  id: 1,
  team_name: 'Avaí/Kindermann',
}]
