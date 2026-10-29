// About tab: a pink "postcard" with lab info and a feature grid.

import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

// Feature tiles shown in a 2 x 2 grid
const featureRows = [
  [
    { icon: '➕', title: 'Add', text: 'Write new items' },
    { icon: '💗', title: 'Finish', text: 'Tap to complete' },
  ],
  [
    { icon: '🗑️', title: 'Delete', text: 'Remove or clear' },
    { icon: '🔎', title: 'Filter', text: 'All, To do, Finished' },
  ],
];

export default function AboutScreen() {
  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-moon-rose">
      <ScrollView
        className="flex-1 bg-moon-cream"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Big rose cover with a curved bottom */}
        <View className="rounded-b-[48px] bg-moon-rose pb-16 pt-6">
          <View className="w-full max-w-xl items-center self-center px-5">
            <Text className="text-sm font-semibold uppercase tracking-widest text-moon-blush">
              Lab Task · React Native
            </Text>
            <Text className="mt-4 text-7xl">🌙</Text>
            <Text className="mt-3 text-4xl font-black text-white md:text-5xl">Moon Jeli</Text>
            <View className="mt-3 flex-row gap-2">
              <View className="rounded-full bg-white/25 px-4 py-1">
                <Text className="font-bold text-white">Roll 16</Text>
              </View>
              <View className="rounded-full bg-white px-4 py-1">
                <Text className="font-bold text-moon-rose-dark">MoonList</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="-mt-8 w-full max-w-xl self-center px-5">
          {/* Short description */}
          <View className="rounded-3xl bg-white p-5 shadow-lg">
            <Text className="text-center text-base text-moon-plum">
              A soft and simple todo app built with React Native, Expo Router and Tailwind CSS.
            </Text>
          </View>

          {/* Feature grid */}
          <Text className="mb-3 mt-6 text-center text-sm font-bold uppercase tracking-widest text-moon-mauve">
            What you can do
          </Text>
          {featureRows.map((row, rowIndex) => (
            <View key={rowIndex} className="mb-3 flex-row gap-3">
              {row.map((feature) => (
                <View
                  key={feature.title}
                  className="flex-1 items-center rounded-3xl bg-moon-blush p-5"
                >
                  <Text className="text-3xl">{feature.icon}</Text>
                  <Text className="mt-2 text-lg font-extrabold text-moon-plum">
                    {feature.title}
                  </Text>
                  <Text className="mt-1 text-center text-xs text-moon-mauve">{feature.text}</Text>
                </View>
              ))}
            </View>
          ))}

          <Text className="mt-4 text-center text-moon-mauve">Made with 💗 by Moon</Text>
        </View>
      </ScrollView>
    </StyledSafeAreaView>
  );
}
