import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

// Интерфейсы для игры
interface RandomItem {
  name: string;
  damage: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
}

interface Player {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  items: RandomItem[];
}

// Генератор рандомных предметов
const generateRandomItem = (): RandomItem => {
  const prefixes = ['🗡️', '🏹', '🔫', '💣', '🛡️', '⚡', '🔥', '❄️', '☢️', '🌟'];
  const weapons = [
    'Супер длинный меч похожий на кота',
    'Портальная пушка',
    'Танк с радиоактивным двигателем',
    'Волшебная палочка хаоса',
    'Лазерный бумеранг',
    'Взрывающийся банан',
    'Киберчеловеческий кулак',
    'Молния в банке',
    'Космический молоток',
    'Невидимый нож'
  ];
  
  const descriptions = [
    'стреляет не туда куда целишься',
    'имеет странные побочные эффекты',
    'работает только по понедельникам',
    'издает смешные звуки',
    'светится в темноте',
    'имеет собственное мнение',
    'случайно меняет цвет',
    'телепортирует врагов'
  ];
  
  const rarities: RandomItem['rarity'][] = ['common', 'rare', 'epic', 'legendary'];
  const rarity = rarities[Math.floor(Math.random() * rarities.length)];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const weapon = weapons[Math.floor(Math.random() * weapons.length)];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  const baseDamage = rarity === 'legendary' ? 50 : rarity === 'epic' ? 35 : rarity === 'rare' ? 25 : 15;
  const damage = baseDamage + Math.floor(Math.random() * 20);
  
  return {
    name: `${prefix} ${weapon}`,
    damage,
    rarity,
    description
  };
};

// Цвета редкости
const getRarityColor = (rarity: RandomItem['rarity']) => {
  switch (rarity) {
    case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    case 'epic': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    case 'rare': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
    default: return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
  }
};

const Index = () => {
  const [gameState, setGameState] = useState<'login' | 'loading' | 'playing'>('login');
  const [playerName, setPlayerName] = useState('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentItems, setCurrentItems] = useState<RandomItem[]>([]);

  // Инициализация игрока
  const initializePlayer = useCallback(() => {
    const newPlayer: Player = {
      id: 'player1',
      name: playerName,
      hp: 100,
      maxHp: 100,
      x: 50, // центр карты
      y: 50,
      items: []
    };
    
    // Генерируем начальные предметы
    const initialItems = Array.from({ length: 4 }, () => generateRandomItem());
    
    setPlayer(newPlayer);
    setCurrentItems(initialItems);
    setGameState('playing');
  }, [playerName]);

  // Обработчик входа в игру
  const handleLogin = () => {
    if (playerName.trim()) {
      setGameState('loading');
      setTimeout(initializePlayer, 2000);
    }
  };

  // Использование предмета
  const useItem = (item: RandomItem) => {
    console.log(`Использую ${item.name} (${item.damage} урона)`);
    
    // Удаляем использованный предмет и добавляем новый
    setCurrentItems(prev => {
      const newItems = prev.filter(i => i !== item);
      newItems.push(generateRandomItem());
      return newItems;
    });
  };

  // Экран входа
  if (gameState === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 flex items-center justify-center font-rubik">
        <Card className="w-96 bg-white/95 backdrop-blur-sm border-4 border-white/50 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              ⚔️ RANDOM BATTLE
            </CardTitle>
            <p className="text-gray-600 mt-2">Арена рандомных сражений</p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {Array.from({ length: 6 }, () => generateRandomItem()).map((item, index) => (
                <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-xl mb-1">{item.name.split(' ')[0]}</div>
                  <div className="text-xs text-gray-500">{item.damage}</div>
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя бойца
              </label>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Введите ваше имя..."
                className="text-center text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-6"
            >
              <Icon name="Gamepad2" size={20} className="mr-2" />
              🚀 Войти в битву
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Экран загрузки
  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-white drop-shadow-lg">
            RANDOM BATTLE
          </div>
          <div className="text-2xl text-white/90 mt-4">
            Генерирую арену для {playerName}...
          </div>
          <div className="flex justify-center space-x-2 mt-6">
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

  // Игровой экран
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 font-rubik relative overflow-hidden">
      {/* Игровая карта */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `
        }}
      />

      {/* HP индикатор */}
      <div className="absolute top-6 left-6 z-10">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-white/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Heart" className="text-red-500" size={24} />
              <div>
                <div className="text-2xl font-bold text-red-600">{player?.hp}/100</div>
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
                    style={{ width: `${(player?.hp || 0)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-gray-600 text-sm mt-2">
              Зона видимости: 10м • Скорость: 5м/с
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Игрок на карте */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-white shadow-lg animate-pulse flex items-center justify-center">
          <Icon name="User" size={24} className="text-gray-800" />
        </div>
        <div className="text-center mt-2 text-white font-bold drop-shadow-lg">
          {playerName}
        </div>
      </div>

      {/* Панель предметов */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-orange-600">⚔️ Ваши предметы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {currentItems.map((item, index) => (
                <div key={index} className="text-center space-y-2">
                  <Button
                    onClick={() => useItem(item)}
                    className={`w-20 h-20 rounded-xl ${getRarityColor(item.rarity)} hover:scale-105 transition-transform`}
                    variant="secondary"
                  >
                    <div className="text-2xl">
                      {item.name.split(' ')[0]}
                    </div>
                  </Button>
                  <div className="max-w-20 text-xs text-gray-700 font-medium leading-tight">
                    {item.name.substring(2)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.damage} урона
                  </Badge>
                </div>
              ))}
            </div>
            <div className="text-center mt-3 text-sm text-gray-600">
              Нажмите на предмет для использования
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Мини-карта */}
      <div className="absolute top-6 right-6 z-10">
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-white/50">
          <CardContent className="p-3">
            <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg relative">
              <div 
                className="w-2 h-2 bg-yellow-400 rounded-full absolute"
                style={{ 
                  left: `${(player?.x || 50)}%`, 
                  top: `${(player?.y || 50)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            <div className="text-xs text-center mt-1 text-gray-600">Карта 100м+</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;