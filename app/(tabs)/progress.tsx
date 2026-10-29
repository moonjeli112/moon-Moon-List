// Progress tab: a big circle with your percent, a message and a small list of numbers.

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { useMoonItems } from '../../context/MoonItemContext';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function ProgressScreen() {
  const { itemTotal, leftCount, finishedCount, finishedPercent } = useMoonItems();

  // A short sentence that changes with your progress
  let message = 'Every little step counts 🌙';
  if (itemTotal === 0) message = 'Add an item to begin ✨';
  else if (finishedPercent === 100) message = 'All finished. Beautiful work! 💗';
  else if (finishedPercent >= 50) message = 'You are doing great 🌸';

  // Rows of the numbers card
  const numberRows = [
    { icon: '🌙', label: 'Total items', value: itemTotal, badge: 'bg-moon-blush' },
    { icon: '💗', label: 'Finished', value: finishedCount, badge: 'bg-moon-petal' },
    { icon: '🌸', label: 'Still left', value: leftCount, badge: 'bg-moon-blush' },
  ];

  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-moon-cream">
      <View className="w-full max-w-xl flex-1 self-center px-5 pt-6">
        <Text className="text-center text-3xl font-extrabold text-moon-plum">Progress</Text>
        <Text className="mt-1 text-center text-moon-mauve">Your journey so far</Text>

        {/* Big circle with soft rings */}
        <View className="mt-7 h-56 w-56 items-center justify-center self-center rounded-full bg-moon-blush">
          <View className="h-44 w-44 items-center justify-center rounded-full border-8 border-moon-petal bg-white">
            <Text className="text-5xl font-extrabold text-moon-rose">{finishedPercent}%</Text>
            <Text className="text-sm text-moon-mauve">finished</Text>
          </View>
        </View>

        {/* Message banner */}
        <View className="mt-6 items-center rounded-full bg-moon-rose px-5 py-3">
          <Text className="font-semibold text-white">{message}</Text>
        </View>

        {/* Numbers card */}
        <View className="mt-5 rounded-3xl bg-white p-2 shadow-sm">
          {numberRows.map((row) => (
            <View key={row.label} className="flex-row items-center p-3">
              <View
                className={`mr-3 h-11 w-11 items-center justify-center rounded-full ${row.badge}`}
              >
                <Text className="text-lg">{row.icon}</Text>
              </View>
              <Text className="flex-1 text-base font-semibold text-moon-plum">{row.label}</Text>
              <Text className="text-2xl font-extrabold text-moon-rose-dark">{row.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
