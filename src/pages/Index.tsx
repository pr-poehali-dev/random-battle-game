import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  const [hp, setHp] = useState(100);

  const randomItems = [
    { name: '🗡️ Супер длинный меч похожий на кота', damage: 25, rarity: 'legendary' },
    { name: '🌀 Портальная пушка (стреляет не туда)', damage: 30, rarity: 'epic' },
    { name: '🚛 Танк с радиоактивным двигателем', damage: 50, rarity: 'legendary' },
    { name: '🎯 Самонаводящийся бумеранг', damage: 20, rarity: 'rare' },
    { name: '⚡ Молния в банке', damage: 35, rarity: 'epic' },
    { name: '🔮 Кристалл замедления времени', damage: 15, rarity: 'common' }
  ];

  const [currentItems, setCurrentItems] = useState([
    randomItems[0], randomItems[1], randomItems[2]
  ]);

  const handleJoinGame = () => {
    if (playerName.trim()) {
      setGameStarted(true);
      setTimeout(() => setShowInterface(true), 1000);
    }
  };

  const generateRandomItems = () => {
    const shuffled = [...randomItems].sort(() => 0.5 - Math.random());
    setCurrentItems(shuffled.slice(0, 3));
  };

  const useItem = (item: any) => {
    setHp(prev => Math.max(0, prev - 10));
    generateRandomItems();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-game-purple';
      case 'epic': return 'bg-game-violet'; 
      case 'rare': return 'bg-game-blue';
      default: return 'bg-game-teal';
    }
  };

  if (showInterface) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-turquoise via-game-blue to-game-teal font-rubik relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/img/6f867911-c1f9-4f60-af90-4cd142f72d53.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* HP Display */}
        <div className="absolute top-4 left-4 z-10">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-white/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon name="Heart" className="text-red-500" size={24} />
                <div>
                  <div className="text-sm font-medium text-gray-600">HP</div>
                  <Progress value={hp} className="w-32 h-3" />
                  <div className="text-xs text-gray-500 mt-1">{hp}/100</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        <div className="flex items-center justify-center min-h-screen relative z-5">
          <div className="text-center space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-full w-24 h-24 mx-auto flex items-center justify-center border-4 border-white/30">
              <Icon name="User" size={32} className="text-white" />
            </div>
            <div className="text-white font-bold text-lg">
              Игрок: {playerName}
            </div>
            <div className="text-white/80">
              Зона видимости: 10м • Скорость: 5м/с
            </div>
          </div>
        </div>

        {/* Items Panel */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-game-orange">Ваши предметы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                {currentItems.map((item, index) => (
                  <div key={index} className="text-center">
                    <Button
                      onClick={() => useItem(item)}
                      className={`w-20 h-20 rounded-xl ${getRarityColor(item.rarity)} hover:scale-105 transition-transform`}
                      variant="secondary"
                    >
                      <div className="text-2xl">
                        {item.name.split(' ')[0]}
                      </div>
                    </Button>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {item.damage} урона
                    </Badge>
                  </div>
                ))}
              </div>
              <Button 
                onClick={generateRandomItems}
                className="w-full mt-4 bg-game-orange hover:bg-game-orange/90"
              >
                <Icon name="Shuffle" size={16} className="mr-2" />
                Новые предметы
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-orange via-game-yellow to-game-purple font-rubik flex items-center justify-center">
        <div className="text-center space-y-6 animate-pulse">
          <div className="text-6xl font-bold text-white drop-shadow-lg">
            RANDOM BATTLE
          </div>
          <div className="text-2xl text-white/90">
            Генерирую арену для {playerName}...
          </div>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-turquoise via-game-blue to-game-purple font-rubik relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/img/6f867911-c1f9-4f60-af90-4cd142f72d53.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-game-orange to-game-purple bg-clip-text text-transparent">
                RANDOM BATTLE
              </div>
              <div className="text-lg text-gray-600 font-medium">
                Боевая арена с рандомными предметами
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {randomItems.slice(0, 6).map((item, index) => (
                  <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">{item.name.split(' ')[0]}</div>
                    <div className="text-xs text-gray-500">{item.damage}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-game-yellow/20 p-4 rounded-lg border-l-4 border-game-orange">
                <div className="font-semibold text-game-orange mb-2">Особенности игры:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Управление как в Brawl Stars</li>
                  <li>• Рандомная генерация карт</li>
                  <li>• Размер карты: больше 100м</li>
                  <li>• HP: 100 | Скорость: 5м/с</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Введите ваше имя:
                </label>
                <Input
                  type="text"
                  placeholder="Введите никнейм..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="text-center text-lg border-2 border-game-turquoise/50 focus:border-game-orange"
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinGame()}
                />
              </div>
              
              <Button 
                onClick={handleJoinGame}
                disabled={!playerName.trim()}
                className="w-full bg-gradient-to-r from-game-orange to-game-purple hover:from-game-purple hover:to-game-orange text-white font-bold py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Icon name="Gamepad2" size={20} className="mr-2" />
                Войти в битву!
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500">
              🚀 Система как в Gartic Phone - никаких аккаунтов, просто играй!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;